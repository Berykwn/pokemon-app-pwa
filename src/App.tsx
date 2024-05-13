import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyPokemon from "./pages/MyPokemon";
import NotFoundPage from "./pages/NotFoundPage";
import Show from "./pages/Show";
import Catch from "./pages/Catch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-pokemons" element={<MyPokemon />} />
        <Route path="/pokemon/:pokemon_name" element={<Show />} />
        <Route path="/battle/:pokemon_name" element={<Catch />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
