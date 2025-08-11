import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CRUD_Student from "./StudentTable";
import EditStudent from "./EditStudent";

function App() {
    const [students, setStudents] = useState([
        { id: 1, name: "John", place: "Delhi", phone: "9876543210" },
        { id: 2, name: "Smith", place: "Mumbai", phone: "9876543210" },
        { id: 3, name: "David", place: "Chennai", phone: "9876543210" },
    ]);

    const updateStudent = (updatedStudent) => {
        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.id === updatedStudent.id ? updatedStudent : student
            )
        );
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <CRUD_Student
                            students={students}
                            updateStudent={updateStudent} // Pass updateStudent here
                        />
                    }
                />
                <Route
                    path="/student/edit/:studentid"
                    element={
                        <EditStudent
                            students={students}
                            updateStudent={updateStudent}
                        />
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;