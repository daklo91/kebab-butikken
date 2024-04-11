import { Link } from "react-router-dom";

function App() {
  return (
    <div className="fade-in-page">
      <div className="text-box">
        <h1>Kebab Butikken</h1>
        <p>Velkommen til Kebab Butikkens produkt feedback! 👋</p>
        <p>Her kan du melde inn alt som for eksempel:</p>
        <ul className="front-page-list">
          <li>👉 Alt som er galt med nettsiden våres</li>
          <li>👉 At kebaben er for sterk</li>
          <li>👉 Gi oss ris eller ros</li>
        </ul>
      </div>
      <div className="align-middle">
        <div>
          <Link className="primary-button front-page" to={`raporter`}>
            Raporter sak
          </Link>
          <br></br>
          <Link className="primary-button front-page" to={`raport-liste`}>
            Se saker
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
