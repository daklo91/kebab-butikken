import React, { useEffect, useState } from "react";
import { getDocs, collection } from "@firebase/firestore";
import { firestore } from "../../firebase_setup/firebase";

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
          {reportList.map((report) => (
            <tr key={report.id}>
              <td>{report.title}</td>
              <td>{report.email}</td>
              <td>{report.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportList;