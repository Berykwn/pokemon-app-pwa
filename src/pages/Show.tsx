import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

interface PokemonData {
  name: string;
  id: number;
  weight: number;
  height: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  moves: { move: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

const Show: React.FC = () => {
  const { pokemon_name } = useParams<{ pokemon_name: string }>();

  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon_name}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pokemon_name]);

  const memoizedPokemonData = useMemo(() => pokemonData, [pokemonData]);

  if (!memoizedPokemonData) {
    return <div>Loading...</div>;
  }

  const handleNavigate = () => {
    navigate(`/battle/${pokemon_name}`);
  };

  return (
    <MainLayout>
      <div className="grid h-full grid-flow-row auto-rows-max grid-cols-2">
        <div className="rounded-2xl border border-black shadow-lg shadow-black dark:border-white m-3 p-5 flex flex-col justify-center">
          <img
            alt={memoizedPokemonData.name}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${memoizedPokemonData.id}.svg`}
            width="200"
            height="200"
            decoding="async"
            data-nimg="1"
            loading="lazy"
          />
          <div className="grid grid-flow-row auto-rows-max grid-cols-2 gap-4">
            {memoizedPokemonData.types.map((item, index) => (
              <p
                key={index}
                className={`overflow-hidden break-all rounded-full p-2 text-center font-arcade text-md capitalize tracking-wide text-white ${
                  index === 0 ? "bg-amber-400" : index === 1 ? "bg-red-400" : ""
                }`}
              >
                {item.type.name}
              </p>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-black shadow-lg shadow-black dark:border-white m-3 p-5 flex flex-col justify-center">
          {memoizedPokemonData.stats.map(
            (stat: { base_stat: number; stat: { name: string } }) => (
              <div key={stat.stat.name} className="w-full">
                <p className="overflow-hidden break-all font-arcade text-sm capitalize tracking-wide text-black dark:text-white">
                  {stat.stat.name}
                </p>
                <div className="h-1 w-full bg-gray-400 dark:bg-gray-200">
                  <div
                    className="h-1 bg-orange-600"
                    style={{ width: `${stat.base_stat}%` }}
                  ></div>
                </div>
                <p className="overflow-hidden break-all font-arcade text-sm capitalize tracking-wide text-black dark:text-white">
                  {stat.base_stat}
                </p>
              </div>
            )
          )}
        </div>

        <div className="rounded-2xl border border-black shadow-lg shadow-black dark:border-white m-3 p-5 undefined col-span-2 undefined">
          <p className="overflow-hidden break-all font-arcade text-md capitalize tracking-wide text-black dark:text-white">
            Name: {memoizedPokemonData.name}
          </p>
          <p className="overflow-hidden break-all font-arcade text-md capitalize tracking-wide text-black dark:text-white">
            Weight: {memoizedPokemonData.weight}
          </p>
          <p className="overflow-hidden break-all font-arcade text-md capitalize tracking-wide text-black dark:text-white">
            Height: {memoizedPokemonData.height}
          </p>
        </div>

        <div className="rounded-2xl border border-black shadow-lg shadow-black dark:border-white m-3 p-5 undefined undefined undefined">
          <ul className="ml-3 list-outside list-disc">
            <li className="overflow-hidden break-all font-arcade text-md capitalize tracking-wide text-black dark:text-white">
              {memoizedPokemonData.abilities[0].ability.name}
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-black shadow-lg shadow-black dark:border-white m-3 p-5 undefined undefined undefined">
          <ul className="ml-3 list-outside list-disc">
            {memoizedPokemonData.moves.slice(0, 4).map((move) => (
              <li
                key={move.move.name}
                className="overflow-hidden break-all font-arcade text-xs capitalize tracking-wide text-black dark:text-white"
              >
                {move.move.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="false m-3 p-5 flex flex-col justify-center col-span-2 undefined">
          <button
            className="$font-arcade place-self-center overflow-hidden break-all rounded-xl border-2 border-black p-2 text-md font-bold capitalize tracking-wide text-black shadow-md shadow-black hover:ring dark:border-white dark:text-white"
            onClick={handleNavigate}
          >
            Catch!
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Show;
