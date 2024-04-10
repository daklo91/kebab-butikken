import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Link to={`raporter`}>Raporter sak</Link>
      <br></br>
      <Link to={`raport-liste`}>Se saker</Link>
    </>
  );
}

export default App;
