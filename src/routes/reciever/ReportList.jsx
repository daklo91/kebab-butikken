import React, { useEffect, useState } from "react";
import { getDocs, collection } from "@firebase/firestore";
import { firestore } from "../../firebase_setup/firebase";
import { Link } from "react-router-dom";

async function fetchDataFromFirestore() {
  const ref = collection(firestore, "reports");
  const querySnapshot = await getDocs(ref);

  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

function ReportList() {
  const [reportList, setReportList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      data.sort((b, a) => new Date(a.date) - new Date(b.date));
      setReportList(data);
    }
    fetchData();
  }, []);

  return (
    <div className="fade-in-page">
      <Link className="navigate-back" to="/">
        <b>&#8249;</b> Tilbake
      </Link>
      <h1>Saksliste</h1>
      <table>
        <thead>
          <tr>
            <th>Tittel</th>
            <th className="hide-on-mobile">Innmelder</th>
            <th>Dato</th>
          </tr>
        </thead>
        <tbody>
          {reportList.length === 0 ? (
            <tr>
              <td colSpan={3}>
                <div class="spinner-box">
                  <span class="material spinner" />
                </div>
              </td>
            </tr>
          ) : (
            reportList.map((report) => (
              <tr className="report-list-row" key={report.id}>
                <td>
                  <b>
                    <Link to={"/raport/" + report.id}>{report.title}</Link>
                  </b>
                </td>
                <td className="hide-on-mobile">{report.email}</td>
                <td>{report.date.split(", ")[0]}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ReportList;
