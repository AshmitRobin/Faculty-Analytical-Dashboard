require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {
    pool,
    testConnection
} = require("./db");

const routes = require("./routes/routes");

const errorHandler =
    require("./middleware/error");


const app = express();


// =========================
// MIDDLEWARE
// =========================

app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {

    res.json({
        message:
            "Faculty Intelligence API is running"
    });

});


// =========================
// API ROUTES
// =========================

app.use(
    "/api",
    routes
);


// =========================
// ERROR HANDLER
// =========================

app.use(errorHandler);


// =========================
// START SERVER
// =========================

const PORT =
    process.env.PORT || 5000;


async function startServer() {

    try {

        await testConnection();

        app.listen(
            PORT,
            () => {

                console.log(
                    `Server running on http://localhost:${PORT}`
                );

                console.log(
                    `API running on http://localhost:${PORT}/api`
                );

            }
        );

    } catch (error) {

        console.error(
            "Server startup failed:"
        );

        console.error(error);

    }

}


startServer();