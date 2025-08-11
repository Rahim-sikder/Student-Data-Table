import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditStudent({ students, updateStudent }) {
    const { studentid } = useParams(); // Get the student ID from the route
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        place: "",
        phone: "",
    });

    useEffect(() => {
        // Find the student by ID and populate the form
        const student = students.find((s) => s.id === parseInt(studentid));
        console.log("Editing student:", student); // Debug log
        if (student) {
            setFormData(student);
        }
    }, [studentid, students]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value }); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting updated student data:", formData); // Debug log
        updateStudent(formData); // Call the update function passed as a prop
        navigate("/"); // Redirect to the main page after updating
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-10">
            <h1 className="text-2xl font-bold mb-4">Edit Student</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Place</label>
                    <input
                        type="text"
                        name="place"
                        value={formData.place}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}