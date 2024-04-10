import React from "react";
import { useLocation } from "react-router-dom";

function ReportOverview() {
  const location = useLocation();
  const { id, description, email, title, date } = location.state;
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{email}</p>
      <p>{date}</p>
      <p>{id}</p>
    </div>
  );
}

export default ReportOverview;
