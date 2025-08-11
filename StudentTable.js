"use client";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CRUD_Student() {
    const [students, setStudents] = useState([
        { id: 1, name: "John", place: "Delhi", phone: "9876543210" },
        { id: 2, name: "Smith", place: "Mumbai", phone: "9876543210" },
        { id: 3, name: "David", place: "Chennai", phone: "9876543210" },
    ]);

    const addStudent = (newStudent) => {
        setStudents([...students, { ...newStudent, id: students.length + 1 }]);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-[#4635B1] shadow-lg rounded-lg mt-96">
            <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400">📚 Student Records</h1>
            <Component addStudent={addStudent} />
            <StudentTable students={students} />
        </div>
    );
}

const StudentTable = ({ students }) => {
    return (
        <div className="mt-6 overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-blue-500 text-white text-left">
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Place</th>
                        <th className="px-4 py-3">Phone</th>
                        <th className="px-4 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id} className="border-b">
                            <td className="px-4 py-3">{student.id}</td>
                            <td className="px-4 py-3">{student.name}</td>
                            <td className="px-4 py-3">{student.place}</td>
                            <td className="px-4 py-3">{student.phone}</td>
                            <td className="px-4 py-3 flex space-x-2">
                                <Button color="purple">View</Button>
                                <Button color="success">Edit</Button>
                                <Button color="failure">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

function Component({ addStudent }) {
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({ name: "", place: "", phone: "" });
    const [error, setError] = useState(""); // New state for error message

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.place || !formData.phone) {
            setError("⚠️ Please fill all fields");
            return;
        }

        addStudent(formData);
        setFormData({ name: "", place: "", phone: "" });
        setError(""); // Clear error when successful
        setOpenModal(false);
    };

    return (
        <>
            <div className="flex justify-center">
                <Button onClick={() => setOpenModal(true)} gradientDuoTone="purpleToBlue">➕ Create New Student</Button>
            </div>

            <Modal show={openModal} onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body className="p-6 bg-[#4635B1] rounded-lg text-gray-50">
                    <h3 className="text-xl font-semibold text-gray-50 text-center">Add Student</h3>
                    <div className="space-y-4 mt-4">
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Name" />
                            <TextInput id="name" name="name" type="text" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                        </div>

                        <div className="mb-2 block">
                            <Label htmlFor="place" value="Place" />
                            <TextInput id="place" name="place" type="text" placeholder="Enter your place" value={formData.place} onChange={handleChange} required />
                        </div>

                        <div className="mb-2 block">
                            <Label htmlFor="phone" value="Phone" />
                            <TextInput id="phone" name="phone" type="text" placeholder="Enter your phone" value={formData.phone} onChange={handleChange} required />
                        </div>

                        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>} {/* Error message displayed here */}
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                        <Button onClick={() => setOpenModal(false)} className="px-4 py-2 bg-red-500 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} className="px-4 py-2 bg-green-400 text-white rounded-lg shadow-md hover:bg-green-600 transition">
                            Submit
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
