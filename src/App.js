import Timer from "./components/timer/Timer";
import Header from "./components/header/Header";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <div className={"wrapper"}>
        <Timer />
      </div>
    </>
  );
}

export default App;
