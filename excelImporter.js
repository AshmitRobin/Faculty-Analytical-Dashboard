const XLSX = require("xlsx");
const db = require("../db");


// ======================================
// IMPORT EXCEL DATA
// ======================================

async function importExcel(filePath) {

    const workbook =
        XLSX.readFile(filePath);


    const sheetName =
        workbook.SheetNames[0];


    const worksheet =
        workbook.Sheets[sheetName];


    const rows =
        XLSX.utils.sheet_to_json(
            worksheet
        );


    let inserted = 0;

    let skipped = 0;

    const errors = [];


    for (let i = 0; i < rows.length; i++) {

        const row = rows[i];


        const facultyName =
            row["Faculty Name"] ||
            row["faculty_name"] ||
            row["Faculty"];


        const email =
            row["Email ID"] ||
            row["email"];


        const designation =
            row["Designation"] ||
            row["designation"];


        const department =
            row["Department"] ||
            row["department"];


        const collegeName =
            row["College Name"] ||
            row["college_name"];


        const collegeWebsite =
            row["College Website"] ||
            row["college_website"];


        if (
            !facultyName ||
            !email ||
            !designation ||
            !department ||
            !collegeName ||
            !collegeWebsite
        ) {

            skipped++;

            errors.push({

                row: i + 2,

                message:
                    "Missing required field"

            });

            continue;

        }


        try {

            await db.query(
                `
                INSERT INTO faculty
                (
                    faculty_name,
                    email,
                    designation,
                    department,
                    college_name,
                    college_website
                )
                VALUES (?, ?, ?, ?, ?, ?)
                `,
                [
                    String(facultyName).trim(),
                    String(email).trim(),
                    String(designation).trim(),
                    String(department).trim(),
                    String(collegeName).trim(),
                    String(collegeWebsite).trim()
                ]
            );


            inserted++;

        } catch (error) {

            skipped++;

            errors.push({

                row: i + 2,

                message:
                    error.code === "ER_DUP_ENTRY"
                        ? "Duplicate email"
                        : error.message

            });

        }

    }


    return {

        totalRows: rows.length,

        inserted,

        skipped,

        errors

    };

}


module.exports = {
    importExcel
};