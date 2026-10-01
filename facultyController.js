const { pool } = require("../db");


// GET ALL FACULTY
exports.getFaculty = async (req, res, next) => {

    try {

        let {
            page = 1,
            limit = 15,
            search = "",
            designation = "",
            college = "",
            department = ""
        } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        if (page < 1) page = 1;

        if (limit < 1 || limit > 100) {
            limit = 15;
        }

        const offset = (page - 1) * limit;

        let where = [];
        let params = [];

        // SEARCH
        if (search.trim() !== "") {

            where.push(`
                (
                    faculty_name LIKE ?
                    OR email LIKE ?
                    OR designation LIKE ?
                    OR department LIKE ?
                    OR college_name LIKE ?
                )
            `);

            const searchValue = `%${search}%`;

            params.push(
                searchValue,
                searchValue,
                searchValue,
                searchValue,
                searchValue
            );

        }

        // DESIGNATION FILTER
        if (designation.trim() !== "") {

            where.push(
                "designation = ?"
            );

            params.push(designation);

        }

        // COLLEGE FILTER
        if (college.trim() !== "") {

            where.push(
                "college_name = ?"
            );

            params.push(college);

        }

        // DEPARTMENT FILTER
        if (department.trim() !== "") {

            where.push(
                "department = ?"
            );

            params.push(department);

        }

        const whereClause =
            where.length > 0
                ? "WHERE " + where.join(" AND ")
                : "";

        // TOTAL COUNT
        const [countRows] = await pool.query(
            `
            SELECT COUNT(*) AS total
            FROM faculty
            ${whereClause}
            `,
            params
        );

        const total = countRows[0].total;

        // FACULTY DATA
        const [rows] = await pool.query(
            `
            SELECT
                id,
                faculty_name,
                email,
                designation,
                department,
                college_name,
                college_website,
                quality_score,
                created_at,
                updated_at
            FROM faculty
            ${whereClause}
            ORDER BY id DESC
            LIMIT ? OFFSET ?
            `,
            [...params, limit, offset]
        );

        const totalPages =
            Math.ceil(total / limit);

        res.json({
            data: rows,
            total,
            page,
            limit,
            totalPages
        });

    } catch (error) {

        next(error);

    }

};


// GET SINGLE FACULTY
exports.getFacultyById = async (req, res, next) => {

    try {

        const [rows] = await pool.query(
            "SELECT * FROM faculty WHERE id = ?",
            [req.params.id]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                message: "Faculty not found"
            });

        }

        res.json(rows[0]);

    } catch (error) {

        next(error);

    }

};


// ADD FACULTY
exports.createFaculty = async (req, res, next) => {

    try {

        const {
            faculty_name,
            email,
            designation,
            department,
            college_name,
            college_website,
            quality_score
        } = req.body;

        if (
            !faculty_name ||
            !email ||
            !designation ||
            !department ||
            !college_name
        ) {

            return res.status(400).json({
                message:
                    "Faculty name, email, designation, department and college are required"
            });

        }

        const [result] = await pool.query(
            `
            INSERT INTO faculty
            (
                faculty_name,
                email,
                designation,
                department,
                college_name,
                college_website,
                quality_score
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [
                faculty_name,
                email,
                designation,
                department,
                college_name,
                college_website || null,
                quality_score || 0
            ]
        );

        const [newFaculty] = await pool.query(
            "SELECT * FROM faculty WHERE id = ?",
            [result.insertId]
        );

        res.status(201).json({
            message: "Faculty added successfully",
            data: newFaculty[0]
        });

    } catch (error) {

        if (error.code === "ER_DUP_ENTRY") {

            return res.status(409).json({
                message:
                    "A faculty member with this email already exists for this college"
            });

        }

        next(error);

    }

};


// UPDATE FACULTY
exports.updateFaculty = async (req, res, next) => {

    try {

        const id = req.params.id;

        const {
            faculty_name,
            email,
            designation,
            department,
            college_name,
            college_website,
            quality_score
        } = req.body;

        if (
            !faculty_name ||
            !email ||
            !designation ||
            !department ||
            !college_name
        ) {

            return res.status(400).json({
                message:
                    "Faculty name, email, designation, department and college are required"
            });

        }

        const [result] = await pool.query(
            `
            UPDATE faculty
            SET
                faculty_name = ?,
                email = ?,
                designation = ?,
                department = ?,
                college_name = ?,
                college_website = ?,
                quality_score = ?
            WHERE id = ?
            `,
            [
                faculty_name,
                email,
                designation,
                department,
                college_name,
                college_website || null,
                quality_score || 0,
                id
            ]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Faculty not found"
            });

        }

        const [updated] = await pool.query(
            "SELECT * FROM faculty WHERE id = ?",
            [id]
        );

        res.json({
            message: "Faculty updated successfully",
            data: updated[0]
        });

    } catch (error) {

        if (error.code === "ER_DUP_ENTRY") {

            return res.status(409).json({
                message:
                    "A faculty member with this email already exists for this college"
            });

        }

        next(error);

    }

};


// DELETE FACULTY
exports.deleteFaculty = async (req, res, next) => {

    try {

        const [result] = await pool.query(
            "DELETE FROM faculty WHERE id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Faculty not found"
            });

        }

        res.json({
            message: "Faculty deleted successfully"
        });

    } catch (error) {

        next(error);

    }

};


// GET COLLEGES FROM FACULTY TABLE
exports.getColleges = async (req, res, next) => {

    try {

        const [rows] = await pool.query(
            `
            SELECT
                college_name,
                college_website,
                COUNT(*) AS faculty_count
            FROM faculty
            GROUP BY college_name, college_website
            ORDER BY college_name
            `
        );

        res.json(rows);

    } catch (error) {

        next(error);

    }

};


// GET DEPARTMENTS FROM FACULTY TABLE
exports.getDepartments = async (req, res, next) => {

    try {

        const [rows] = await pool.query(
            `
            SELECT
                department,
                COUNT(*) AS faculty_count
            FROM faculty
            GROUP BY department
            ORDER BY department
            `
        );

        res.json(rows);

    } catch (error) {

        next(error);

    }

};