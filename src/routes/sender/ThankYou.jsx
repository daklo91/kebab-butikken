import React from "react";
import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <div className="fade-in-page">
      <Link className="navigate-back" to="/">
        <b>&#8249;</b> Tilbake
      </Link>
      <h1>Takk for feedback! 🎉</h1>
      <p>Hvis vi har noen spørsmål så vil vi kontakte deg.</p>
      <p>
        Om du ønsker, så kan du se alle sakene vi jobber med{" "}
        <Link to="/raport-liste">her</Link>
        <p>eller</p>
        <Link className="primary-button" to="/raporter">
          Send inn en sak til
        </Link>
      </p>
    </div>
  );
}

export default ThankYou;
