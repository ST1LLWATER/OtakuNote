import "./App.css";
import Input from "./components/Input";
import Cards from "./components/Cards";
import AnimeContextProvider from "./contexts/AnimeContext";

function App() {
  return (
    <AnimeContextProvider>
      <div className="cover ">
        <div className="form">
          <Input />
        </div>
        <Cards />
      </div>
    </AnimeContextProvider>
  );
}

export default App;
