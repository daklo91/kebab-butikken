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
      setReportList(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <p>ReportList</p>
      <table>
        <thead>
          <tr>
            <th>Tittel</th>
            <th>Innmelder</th>
            <th>Dato</th>
          </tr>
        </thead>
        <tbody>
          {reportList.length === 0 ? (
            <tr>
              <td>
                <p>Loading...</p>
              </td>
            </tr>
          ) : (
            reportList.map((report) => (
              <tr key={report.id}>
                <td>
                  <Link to={"/raport/" + report.id} state={{ ...report }}>
                    {report.title}
                  </Link>
                </td>
                <td>{report.email}</td>
                <td>{report.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ReportList;
