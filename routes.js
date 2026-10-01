const express = require("express");

const router = express.Router();

const authController =
    require("../controllers/authcontroller");

const facultyController =
    require("../controllers/facultyController");

const analyticsController =
    require("../controllers/analyticsController");

const auth =
    require("../middleware/auth");


// =========================
// AUTH
// =========================

router.post(
    "/auth/login",
    authController.login
);


// =========================
// ANALYTICS
// =========================

router.get(
    "/analytics/summary",
    auth,
    analyticsController.getSummary
);


// =========================
// FACULTY
// =========================

router.get(
    "/faculty",
    auth,
    facultyController.getFaculty
);

router.get(
    "/faculty/:id",
    auth,
    facultyController.getFacultyById
);

router.post(
    "/faculty",
    auth,
    facultyController.createFaculty
);

router.put(
    "/faculty/:id",
    auth,
    facultyController.updateFaculty
);

router.delete(
    "/faculty/:id",
    auth,
    facultyController.deleteFaculty
);


// =========================
// COLLEGES
// =========================

// Colleges are obtained from faculty table
router.get(
    "/colleges",
    auth,
    facultyController.getColleges
);


// =========================
// DEPARTMENTS
// =========================

// Departments are obtained from faculty table
router.get(
    "/departments",
    auth,
    facultyController.getDepartments
);


module.exports = router;