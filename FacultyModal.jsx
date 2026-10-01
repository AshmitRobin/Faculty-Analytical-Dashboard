import {
    useEffect,
    useState
} from "react";

import {
    X
} from "lucide-react";

import api from "../services/api";


function FacultyModal({
    faculty,
    colleges = [],
    departments = [],
    onClose,
    onSaved
}) {

    const [form, setForm] =
        useState({

            faculty_name: "",
            email: "",
            designation: "",
            department: "",
            college_name: "",
            college_website: "",
            quality_score: 0

        });


    const [saving, setSaving] =
        useState(false);


    useEffect(() => {

        if (faculty) {

            setForm({

                faculty_name:
                    faculty.faculty_name || "",

                email:
                    faculty.email || "",

                designation:
                    faculty.designation || "",

                department:
                    faculty.department || "",

                college_name:
                    faculty.college_name || "",

                college_website:
                    faculty.college_website || "",

                quality_score:
                    faculty.quality_score || 0

            });

        }

    }, [faculty]);


    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setForm(
            previous => ({

                ...previous,

                [name]:
                    name === "quality_score"
                        ? Number(value)
                        : value

            })
        );

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);


        try {

            if (faculty) {

                await api.put(
                    `/faculty/${faculty.id}`,
                    form
                );

            } else {

                await api.post(
                    "/faculty",
                    form
                );

            }


            alert(
                faculty
                    ? "Faculty updated successfully"
                    : "Faculty added successfully"
            );

            onSaved();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Operation failed"
            );

        } finally {

            setSaving(false);

        }

    };


    return (

        <div className="modal-overlay">

            <div className="modal">


                <div className="modal-header">

                    <h2>

                        {faculty
                            ? "Edit Faculty"
                            : "Add Faculty"}

                    </h2>


                    <button
                        onClick={onClose}
                    >

                        <X />

                    </button>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="faculty-form"
                >


                    <label>
                        Faculty Name

                        <input
                            name="faculty_name"
                            value={
                                form.faculty_name
                            }
                            onChange={
                                handleChange
                            }
                            required
                        />

                    </label>


                    <label>
                        Email

                        <input
                            type="email"
                            name="email"
                            value={
                                form.email
                            }
                            onChange={
                                handleChange
                            }
                            required
                        />

                    </label>


                    <label>
                        Designation

                        <select
                            name="designation"
                            value={
                                form.designation
                            }
                            onChange={
                                handleChange
                            }
                            required
                        >

                            <option value="">
                                Select Designation
                            </option>

                            <option value="Professor">
                                Professor
                            </option>

                            <option value="Associate Professor">
                                Associate Professor
                            </option>

                            <option value="Assistant Professor">
                                Assistant Professor
                            </option>

                            <option value="Lecturer">
                                Lecturer
                            </option>

                        </select>

                    </label>


                    <label>
                        Department

                        <select
                            name="department"
                            value={
                                form.department
                            }
                            onChange={
                                handleChange
                            }
                            required
                        >

                            <option value="">
                                Select Department
                            </option>


                            {departments.map(
                                item => (

                                <option
                                    key={
                                        item.department
                                    }
                                    value={
                                        item.department
                                    }
                                >
                                    {
                                        item.department
                                    }
                                </option>

                            ))}


                            {!departments.some(
                                item =>
                                    item.department ===
                                    form.department
                            ) &&
                            form.department && (

                                <option
                                    value={
                                        form.department
                                    }
                                >
                                    {
                                        form.department
                                    }
                                </option>

                            )}

                        </select>

                    </label>


                    <label>
                        College

                        <select
                            name="college_name"
                            value={
                                form.college_name
                            }
                            onChange={
                                handleChange
                            }
                            required
                        >

                            <option value="">
                                Select College
                            </option>


                            {colleges.map(
                                item => (

                                <option
                                    key={
                                        item.college_name
                                    }
                                    value={
                                        item.college_name
                                    }
                                >
                                    {
                                        item.college_name
                                    }
                                </option>

                            ))}


                            {!colleges.some(
                                item =>
                                    item.college_name ===
                                    form.college_name
                            ) &&
                            form.college_name && (

                                <option
                                    value={
                                        form.college_name
                                    }
                                >
                                    {
                                        form.college_name
                                    }
                                </option>

                            )}

                        </select>

                    </label>


                    <label>
                        College Website

                        <input
                            type="url"
                            name="college_website"
                            placeholder="https://example.com"
                            value={
                                form.college_website
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </label>


                    <label>
                        Quality Score

                        <input
                            type="number"
                            name="quality_score"
                            min="0"
                            max="100"
                            value={
                                form.quality_score
                            }
                            onChange={
                                handleChange
                            }
                        />

                    </label>


                    <div className="modal-actions">

                        <button
                            type="button"
                            onClick={onClose}
                            className="secondary-button"
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="primary-button"
                            disabled={saving}
                        >

                            {saving
                                ? "Saving..."
                                : faculty
                                    ? "Update Faculty"
                                    : "Add Faculty"}

                        </button>

                    </div>


                </form>

            </div>

        </div>

    );

}


export default FacultyModal;