import React, { useState } from "react";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "../../firebase_setup/firebase";

function Report() {
  const [error, setError] = useState(false);
  const title = useRef();
  const description = useRef();
  const email = useRef();
  const navigate = useNavigate();

  const submitReport = (e) => {
    e.preventDefault();
    const reportObject = {
      title: title.current.value,
      description: description.current.value,
      email: email.current.value,
      date: new Date().toLocaleString("no-NO"),
    };

    const ref = collection(firestore, "reports");

    addDoc(ref, reportObject)
      .then(() => {
        navigate("/takk");
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  return (
    <div className="fade-in-page">
      <Link className="navigate-back" to="/">
        <b>&#8249;</b> Tilbake
      </Link>
      <h1>Raporter sak</h1>
      <form onSubmit={submitReport}>
        <div className="form-control">
          <p>
            <b>Tilbakemeldings Tittel</b>
            <br />
            Legg til en kort og beskrivende tittel
          </p>
          <input type="text" ref={title} required />
        </div>
        <div className="form-control">
          <p>
            <b>Beskrivelse</b>
            <br />
            Ta med spesifikke kommentarer om hva som bør forbedres, legges til
            osv.
          </p>
          <textarea rows="6" ref={description} required />
        </div>
        <div className="form-control">
          <p>
            <b>Email*</b>
          </p>
          <input type="email" ref={email} required />
          <p class="info-text">
            <small>
              *Vi bruker email til å kontakte deg hvis vi trenger hjelp med å
              forstå saken.
            </small>
          </p>
        </div>
        <button className="primary-button" type="submit">
          Raporter
        </button>
      </form>
      {error ? (
        <div style={{ color: "red" }}>Noe gikk galt, prøv igjen!</div>
      ) : null}
    </div>
  );
}

export default Report;
