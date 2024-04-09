import React, { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

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
    <>
      <div>
        <form onSubmit={submitReport}>
          <p>Tittel</p>
          <input type="text" ref={title} required />
          <p>Beskrivelse</p>
          <textarea ref={description} required />
          <p>Email*</p>
          <input type="email" ref={email} required />
          <p>
            <small>
              *Vi bruker email til å kontakte deg hvis vi trenger hjelp med å
              forstå saken.
            </small>
          </p>
          <button type="submit">Raporter</button>
        </form>
        {error ? (
          <div style={{ color: "red" }}>Noe gikk galt, prøv igjen!</div>
        ) : null}
      </div>
    </>
  );
}

export default Report;
