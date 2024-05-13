import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";

const Home = () => {
  const [pokemonData, setPokemonData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data);
      setPokemonData(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <MainLayout>
      <div className="grid grid-flow-row auto-rows-max grid-cols-2 gap-3 p-6">
        {pokemonData.map((pokemon: any, index: number) => (
          <div
            key={index}
            className="flex h-full flex-col rounded-2xl border-4 border-black shadow-lg shadow-black dark:border-white"
          >
            <Link
              className="flex h-full flex-col items-center justify-between"
              to={`/pokemon/${pokemon.name}`}
            >
              <div className="flex h-full w-full items-center justify-center">
                <img
                  alt={pokemon.name}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                    index + 1
                  }.svg`}
                  width="170"
                  height="200"
                  decoding="async"
                  data-nimg="1"
                  className="h-auto w-auto"
                  loading="lazy"
                  style={{ color: "transparent" }}
                />
              </div>
              <p className="w-full rounded-b-lg bg-black py-2 text-center text-lg font-bold uppercase tracking-widest text-white dark:rounded-b-xl">
                {pokemon.name}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Home;
