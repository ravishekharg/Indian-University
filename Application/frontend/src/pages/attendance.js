import { useEffect, useState } from "react";
import api from "../services/api";

function Attendance() {

  const [attendance, setAttendance] =
      useState({});

  useEffect(() => {

    api.get("/attendance")
       .then(response => {

          setAttendance(
             response.data
          );

       });

  }, []);

  return (

    <div>

      <h1>Attendance</h1>

      <h3>
        Present : {attendance.present}
      </h3>

      <h3>
        Absent : {attendance.absent}
      </h3>

    </div>
  );
}

export default Attendance;