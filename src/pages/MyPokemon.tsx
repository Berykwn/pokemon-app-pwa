import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";

interface PokemonItem {
  pokemon: {
    name: string;
    sprites: {
      other: {
        dream_world: {
          front_default: string;
        };
      };
    };
  };
  nickname: string;
}

const MyPokemon = () => {
  const [myPokemonList, setMyPokemonList] = useState<PokemonItem[]>([]);
  useEffect(() => {
    const pokemons = localStorage.getItem("myPokemon");
    if (pokemons) {
      setMyPokemonList(JSON.parse(pokemons));
    }
  }, []);

  const handleDeletePokemon = (index: number) => {
    const pokemons = [...myPokemonList];

    pokemons.splice(index, 1);

    setMyPokemonList(pokemons);

    localStorage.setItem("myPokemon", JSON.stringify(pokemons));
  };

  return (
    <MainLayout>
      <div className="grid grid-flow-row auto-rows-max grid-cols-2 gap-3 p-6">
        {myPokemonList.length > 0 ? (
          myPokemonList.map((item, index) => (
            <div
              key={index}
              className="relative flex h-full flex-col rounded-2xl border-4 border-black shadow-lg shadow-black dark:border-white"
            >
              <button
                className="absolute top-0 right-0 px-2 text-xl"
                onClick={() => handleDeletePokemon(index)}
              >
                X
              </button>
              <Link
                className="flex h-full flex-col items-center justify-between"
                to={`/pokemon/${item.pokemon.name}`}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    alt={item.pokemon.name}
                    src={item.pokemon.sprites.other.dream_world.front_default}
                    className="object-cover text-center py-3"
                    width="150px"
                    height="150px"
                    loading="lazy"
                  />
                </div>
                <p className="w-full rounded-b-lg bg-black py-2 text-center font-arcade text-xs font-bold uppercase tracking-widest text-white dark:rounded-b-xl">
                  {item.pokemon.name}
                  <br />({item.nickname})
                </p>
              </Link>
            </div>
          ))
        ) : (
          <p className="dark:text-neutral-300">No pokemon saved.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default MyPokemon;
