const { pool } = require("../db");

exports.getSummary = async (req, res, next) => {

    try {

        const [
            [summaryRows],
            [designationRows],
            [departmentRows],
            [collegeRows],
            [qualityRows]
        ] = await Promise.all([

            pool.query(`
                SELECT
                    COUNT(*) AS totalFaculty,
                    COUNT(DISTINCT college_name) AS totalColleges,
                    COUNT(DISTINCT department) AS totalDepartments,
                    ROUND(AVG(quality_score), 2) AS averageQuality
                FROM faculty
            `),

            pool.query(`
                SELECT
                    designation AS name,
                    COUNT(*) AS value
                FROM faculty
                GROUP BY designation
                ORDER BY value DESC
            `),

            pool.query(`
                SELECT
                    department AS name,
                    COUNT(*) AS value
                FROM faculty
                GROUP BY department
                ORDER BY value DESC
            `),

            pool.query(`
                SELECT
                    college_name AS name,
                    COUNT(*) AS value
                FROM faculty
                GROUP BY college_name
                ORDER BY value DESC
                LIMIT 10
            `),

            pool.query(`
                SELECT
                    SUM(
                        CASE
                            WHEN quality_score >= 90 THEN 1
                            ELSE 0
                        END
                    ) AS excellent,

                    SUM(
                        CASE
                            WHEN quality_score >= 75
                            AND quality_score < 90
                            THEN 1
                            ELSE 0
                        END
                    ) AS good,

                    SUM(
                        CASE
                            WHEN quality_score < 75 THEN 1
                            ELSE 0
                        END
                    ) AS needsReview

                FROM faculty
            `)

        ]);

        res.json({

            totalFaculty:
                summaryRows[0].totalFaculty,

            totalColleges:
                summaryRows[0].totalColleges,

            totalDepartments:
                summaryRows[0].totalDepartments,

            averageQuality:
                summaryRows[0].averageQuality || 0,

            facultyByDesignation:
                designationRows,

            facultyByDepartment:
                departmentRows,

            topColleges:
                collegeRows,

            quality: {
                excellent:
                    qualityRows[0].excellent || 0,

                good:
                    qualityRows[0].good || 0,

                needsReview:
                    qualityRows[0].needsReview || 0
            }

        });

    } catch (error) {

        next(error);

    }

};