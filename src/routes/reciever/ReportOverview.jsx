import React, { useCallback, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase_setup/firebase";
import { Link } from "react-router-dom";

async function fetchData(docID) {
  const docRef = doc(firestore, "reports", docID);
  let data = "";
  await getDoc(docRef).then((snapshot) => {
    return (data = snapshot.data());
  });
  return data;
}

async function fetchCommentData(docID) {
  const commentCollection = collection(firestore, "reports", docID, "comments");
  let commentData = [];
  const querySnapshot = await getDocs(commentCollection);
  querySnapshot.forEach((doc) => {
    commentData.push({ id: doc.id, ...doc.data() });
  });

  commentData.sort((b, a) => new Date(a.date) - new Date(b.date));

  return commentData;
}

function ReportOverview() {
  const [reportState, setReportState] = useState("");
  const [commentState, setCommentState] = useState("");
  const commentRef = useRef(null);
  let { reportID } = useParams();

  useEffect(() => {
    async function callAsyncFunction() {
      let data = await fetchData(reportID);
      setReportState(data);
      let commentData = await fetchCommentData(reportID);
      setCommentState(commentData);
    }
    callAsyncFunction();
  }, []);

  const updateReport = useCallback(async (key, value) => {
    const docRef = doc(firestore, "reports", reportID);
    if (key === "comment") {
      await addDoc(collection(firestore, "reports", reportID, "comments"), {
        comment: commentRef.current.value,
        date: new Date().toLocaleString("no-NO"),
      });
      commentRef.current.value = "";
    } else {
      await updateDoc(docRef, {
        [key]: value,
      });
    }
    let data = await fetchData(reportID);
    setReportState(data);
    let commentData = await fetchCommentData(reportID);
    setCommentState(commentData);
  }, []);

  return (
    <div>
      <Link className="navigate-back" to="/raport-liste">
        <b>&#8249;</b> Tilbake
      </Link>
      {reportState.length == 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="fade-in-page">
          <p className="report-overview-title">{reportState.title}</p>
          <p className="report-overview-description">
            {reportState.description}
          </p>
          <hr />
          <div className="report-overview-info-container">
            <div className="report-overview-info">
              <div className="report-overview-dropdown-container">
                <p>Status:</p>
                <select
                  value={reportState.status}
                  onChange={() => updateReport("status", event.target.value)}
                >
                  <option value="Ikke startet">Ikke startet</option>
                  <option value="Under Arbeid">Under Arbeid</option>
                  <option value="Ferdig">Ferdig</option>
                </select>
              </div>
              <div className="report-overview-dropdown-container">
                <p>Prioritet:</p>
                <select
                  value={reportState.priority}
                  onChange={() => updateReport("priority", event.target.value)}
                >
                  <option value="Lav">Lav</option>
                  <option value="Middels">Middels</option>
                  <option calue="Høy">Høy</option>
                </select>
              </div>
              <div className="report-overview-dropdown-container">
                <p>Tildelt:</p>
                <select
                  value={reportState.assigned}
                  onChange={() => updateReport("assigned", event.target.value)}
                >
                  <option value="Ingen">Ingen</option>
                  <option value="Dennis Bjørneset">Dennis Bjørneset</option>
                  <option value="Bjarte Per">Bjarte Per</option>
                  <option calue="Anjani">Anjani</option>
                  <option calue="Ola Nordmann">Ola Nordmann</option>
                  <option calue="Christian">Christian</option>
                </select>
              </div>
            </div>
            <div className="report-overview-info-text-container">
              <div className="report-overview-info-text">
                <p>Innmelder: {reportState.email}</p>
              </div>
              <div className="report-overview-info-text">
                <p>Dato: {reportState.date}</p>
              </div>
            </div>
          </div>
          <hr />
          <p className="comment-info">Skriv en kommentar:</p>
          <textarea ref={commentRef}></textarea>
          <button
            className="comment-button"
            onClick={() => updateReport("comment")}
          >
            Kommenter
          </button>
          {commentState.length == 0 ? (
            <div></div>
          ) : (
            commentState.map((comment) => (
              <div className="comment-box" key={comment.id}>
                <div>{comment.comment}</div>
                <div className="comment-date">{comment.date}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ReportOverview;
