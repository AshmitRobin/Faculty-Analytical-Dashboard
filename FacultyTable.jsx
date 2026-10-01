import {
    Pencil,
    Trash2
} from "lucide-react";


function FacultyTable({
    faculty = [],
    onEdit,
    onDelete
}) {

    if (!Array.isArray(faculty)) {

        faculty = [];

    }


    if (faculty.length === 0) {

        return (

            <div className="empty-state">

                <h3>
                    No faculty records found
                </h3>

                <p>
                    Try changing your search or filters.
                </p>

            </div>

        );

    }


    return (

        <div className="table-wrapper">

            <table className="faculty-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Faculty Name</th>

                        <th>Email</th>

                        <th>Designation</th>

                        <th>Department</th>

                        <th>College</th>

                        <th>Quality</th>

                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>

                    {faculty.map(
                        (person) => (

                        <tr
                            key={person.id}
                        >

                            <td>
                                {person.id}
                            </td>

                            <td>
                                <strong>
                                    {
                                        person.faculty_name
                                    }
                                </strong>
                            </td>

                            <td>
                                {person.email}
                            </td>

                            <td>
                                {person.designation}
                            </td>

                            <td>
                                {person.department}
                            </td>

                            <td>

                                <div>

                                    <strong>
                                        {
                                            person.college_name
                                        }
                                    </strong>

                                    {person.college_website && (

                                        <a
                                            href={
                                                person.college_website
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Website
                                        </a>

                                    )}

                                </div>

                            </td>

                            <td>

                                <span className="quality-badge">

                                    {
                                        person.quality_score
                                    }%

                                </span>

                            </td>

                            <td>

                                <div className="action-buttons">

                                    <button
                                        onClick={() =>
                                            onEdit(
                                                person
                                            )
                                        }
                                        title="Edit"
                                    >

                                        <Pencil
                                            size={17}
                                        />

                                    </button>


                                    <button
                                        onClick={() =>
                                            onDelete(
                                                person.id
                                            )
                                        }
                                        title="Delete"
                                    >

                                        <Trash2
                                            size={17}
                                        />

                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}


export default FacultyTable;