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

  console.log("uhuy", myPokemonList);

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
                className="absolute top-0 right-0 bg-red-500 text-white px-2 py-2 rounded-bl-lg rounded-tr-lg"
                onClick={() => handleDeletePokemon(index)}
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="#ef4444"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <Link
                className="flex h-full flex-col items-center justify-between"
                to={`/pokemon/${item.pokemon.name}`}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    alt={item.pokemon.name}
                    src={item.pokemon.sprites.other.dream_world.front_default}
                    width="170"
                    height="200"
                    decoding="async"
                    data-nimg="1"
                    className="h-auto w-auto"
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
