import { Link, useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useMemo, useState } from "react";

interface PokemonData {
  name: string;
  id: number;
}

const Catch = () => {
  const { pokemon_name } = useParams<{ pokemon_name: string }>();

  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [countPokemonCatch, setCountPokemonCatch] = useState<number | null>(
    null
  );
  const [nicknameError, setNicknameError] = useState("");

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
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pokemon_name]);

  const memoizedPokemonData = useMemo(() => pokemonData, [pokemonData]);

  const handleCatchClick = () => {
    const number = Math.floor(Math.random() * 51) + 50;

    setCountPokemonCatch(number);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCatchPokemonSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nickname = (event.target as HTMLFormElement).nickname.value.trim();

    if (!nickname) {
      setNicknameError("Please enter a nickname.");
      return;
    }

    setNicknameError("");

    const myPokemon = JSON.parse(localStorage.getItem("myPokemon") || "[]");
    const existingNickname = myPokemon.find(
      (item: { nickname: string }) => item.nickname === nickname
    );

    if (existingNickname) {
      setNicknameError(`Nickname ${nickname} already exists!`);
      return;
    }

    setNicknameError("");

    myPokemon.push({ pokemon: memoizedPokemonData, nickname });

    localStorage.setItem("myPokemon", JSON.stringify(myPokemon));

    setShowModal(false);

    navigate("/my-pokemons");
  };

  if (!memoizedPokemonData) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="grid h-full w-full grid-flow-col grid-rows-2 bg-[url('https://pokemon.devanada.com/battleground.png')] bg-cover bg-center bg-repeat">
        <div className="grid place-content-between justify-self-center">
          <div className="rounded-2xl border border-black shadow-lg shadow-black dark:border-white m-3 p-5 undefined undefined bg-green-900">
            <p className="text-center font-arcade text-lg tracking-wide text-white">
              Wild Ivysaur appear
            </p>
          </div>

          <img
            alt={memoizedPokemonData.name}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${memoizedPokemonData.id}.svg`}
            width="200"
            height="200"
            decoding="async"
            data-nimg="1"
            loading="lazy"
            className="place-self-center self-end"
          />
        </div>
        <div className="grid auto-rows-max grid-cols-2 self-end">
          <div className="rounded-2xl border border-black shadow-lg shadow-black dark:border-white m-3 p-5 undefined undefined bg-cyan-800">
            <p className="text-left font-arcade text-2xl tracking-wide text-white">
              What will
            </p>
            <p className="text-left font-arcade text-2xl tracking-wide text-white">
              You do?
            </p>
          </div>
          <div className="rounded-2xl border border-black shadow-lg shadow-black dark:border-white m-3 p-5 undefined undefined bg-yellow-700">
            <div className="grid auto-rows-max grid-cols-2">
              <button
                className="text-left font-arcade text-2xl tracking-wide text-white"
                onClick={handleCatchClick}
              >
                CATCH
              </button>

              <Link
                to="/"
                className="text-left font-arcade text-2xl tracking-wide text-white"
              >
                RUN
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-800 bg-opacity-75 flex items-center justify-center">
          <div className="rounded-xl border-2 border-black bg-white p-5 dark:border-white dark:bg-neutral-800 relative">
            <button
              className="absolute top-0 right-0 bg-red-500 text-white px-2 rounded-bl-lg rounded-tr-lg"
              onClick={closeModal}
            >
              X
            </button>
            {countPokemonCatch != null && countPokemonCatch >= 50 && (
              <form onSubmit={handleCatchPokemonSubmit}>
                <div className="mb-2 mt-6">
                  <p className="text-center font-arcade text-3xl font-bold tracking-wide text-neutral-800 dark:text-white">
                    Congratulation!
                  </p>
                  <p className="text-center font-arcade text-2xl font-bold tracking-wide text-neutral-800 dark:text-white">
                    You caught {memoizedPokemonData.name}!
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="nickname"
                    className="block text-xl font-medium text-gray-900 dark:text-white"
                  >
                    Nickname
                  </label>
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {nicknameError && (
                    <p className="text-red-500 text-sm">{nicknameError}</p>
                  )}
                  <div className="flex justify-center items-center">
                    <button className="mt-4 rounded-xl border p-2 text-center font-arcade text-lg tracking-wide bg-green-400 text-white">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            )}

            {countPokemonCatch != null && countPokemonCatch <= 50 && (
              <div className="mb-2 mt-6">
                <p className="text-center font-arcade text-3xl font-bold tracking-wide text-neutral-800 dark:text-white">
                  Opps!
                </p>
                <p className="text-center font-arcade text-2xl font-bold tracking-wide text-neutral-800 dark:text-white">
                  You missed {memoizedPokemonData.name}!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Catch;
