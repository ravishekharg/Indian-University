import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
    const [data, setData] = useState({});
    useEffect(() => {
        api.get("/dashboard")
            .then(response => {
                setData(response.data);
            });

    }, []);

    return (

        <div>
            <h1>University Dashboard</h1>
            <h3>Students : {data.students}</h3>
            <h3>Faculty : {data.faculty}</h3>
            <h3>Courses : {data.courses}</h3>
        </div>
    );
}

export default Dashboard;