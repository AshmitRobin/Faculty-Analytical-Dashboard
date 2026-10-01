const { pool } = require("../db");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const sql = `
        SELECT *
        FROM users
        WHERE email = ? AND password = ?
    `;

    try {
        const [results] = await pool.query(sql, [email, password]);

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = results[0];

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email
            },
            process.env.JWT_SECRET || "faculty_secret",
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({
            message: "Database error"
        });
    }
};

module.exports = {
    login
};