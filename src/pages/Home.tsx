import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";

import reactLogo from "../assets/loading.svg";

interface PokemonItem {
  name: string;
}

interface PokemonResponse {
  results: PokemonItem[];
}

const Home = () => {
  const [pokemonData, setPokemonData] = useState<PokemonResponse>({
    results: [],
  });

  const [loading, setLoading] = useState<boolean>(true);

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
      setPokemonData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <section className="grid grid-flow-row auto-rows-max grid-cols-2 gap-3 p-6">
        {pokemonData.results?.map((pokemon: PokemonItem, index: number) => (
          <article
            key={index}
            className="flex flex-col rounded-xl border-4 border-black shadow-lg dark:border-white min-w-24 min-h-24"
          >
            <Link
              className="flex h-full flex-col items-center justify-between"
              to={`/pokemon/${pokemon.name}`}
            >
              <figure className="flex justify-center aspect-w-4 aspect-h-5 w-full">
                {loading && (
                  <img
                    alt="loading"
                    src={reactLogo}
                    className="object-cover text-center py-3"
                    width={"150px"}
                    height={"150px"}
                    loading="lazy"
                  />
                )}
                {!loading && (
                  <img
                    alt={`image-${pokemon.name}`}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                      index + 1
                    }.svg`}
                    className="object-cover text-center py-2"
                    width={"150px"}
                    height={"150px"}
                    loading="lazy"
                  />
                )}
              </figure>
              <figcaption className="w-full rounded-b-lg bg-black py-2 text-center text-lg font-bold uppercase tracking-widest text-white dark:rounded-b-xl">
                {pokemon.name}
              </figcaption>
            </Link>
          </article>
        ))}
      </section>
    </MainLayout>
  );
};

export default Home;
