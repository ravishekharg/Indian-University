import { useEffect, useState } from "react";
import api from "../services/api";

function Students() {

  const [students, setStudents] = useState([]);

  useEffect(() => {

    api.get("/students")
       .then(response => {
          setStudents(response.data);
       });

  }, []);

  return (

    <div>

      <h1>Students</h1>

      <table>

        <thead>

          <tr>

            <th>ID</th>
            <th>Name</th>
            <th>Course</th>

          </tr>

        </thead>

        <tbody>

          {
            students.map(student => (

              <tr key={student.id}>

                <td>{student.id}</td>

                <td>{student.name}</td>

                <td>{student.course}</td>

              </tr>
            ))
          }

        </tbody>

      </table>

    </div>
  );
}

export default Students;