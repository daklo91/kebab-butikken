import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase_setup/firebase";

async function fetchData(docID) {
  const docRef = doc(firestore, "reports", docID);
  let data = "";
  await getDoc(docRef).then((snapshot) => {
    return (data = snapshot.data());
  });
  return data;
}

function ReportOverview() {
  const [reportState, setReportState] = useState("");
  let { reportID } = useParams();

  useEffect(() => {
    async function callAsyncFunction() {
      let data = await fetchData(reportID);
      setReportState(data);
    }
    callAsyncFunction();
  }, []);

  const updateDescription = useCallback(async (key, value) => {
    const docRef = doc(firestore, "reports", reportID);
    await updateDoc(docRef, {
      [key]: value,
    });
    let data = await fetchData(reportID);
    setReportState(data);
    console.log(reportState);
  }, []);

  return (
    <div>
      {reportState.length == 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>{reportState.title}</p>
          <p>{reportState.description}</p>
          <p>{reportState.email}</p>
          <p>{reportState.date}</p>
          <select
            value={reportState.priority}
            onChange={() => updateDescription("priority", event.target.value)}
          >
            <option value="Lav">Lav</option>
            <option value="Middels">Middels</option>
            <option calue="Høy">Høy</option>
          </select>
          <select
            value={reportState.status}
            onChange={() => updateDescription("status", event.target.value)}
          >
            <option value="Ikke startet">Ikke startet</option>
            <option value="Under Arbeid">Under Arbeid</option>
            <option value="Ferdig">Ferdig</option>
          </select>
          <select
            value={reportState.assigned}
            onChange={() => updateDescription("assigned", event.target.value)}
          >
            <option value="Ingen">Ingen</option>
            <option value="Dennis Bjørneset">Dennis Bjørneset</option>
            <option value="Bjarte Per">Bjarte Per</option>
            <option calue="Anjani">Anjani</option>
            <option calue="Ola Nordmann">Ola Nordmann</option>
            <option calue="Christian">Christian</option>
          </select>
        </>
      )}
    </div>
  );
}

export default ReportOverview;
