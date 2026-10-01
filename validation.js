function validateFaculty(data) {

    const errors = {};


    // Faculty name

    if (
        !data.faculty_name ||
        data.faculty_name.trim().length < 2
    ) {

        errors.faculty_name =
            "Faculty name must contain at least 2 characters";

    }


    // Email

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
        !data.email ||
        !emailRegex.test(data.email)
    ) {

        errors.email =
            "Enter a valid email address";

    }


    // Designation

    if (!data.designation) {

        errors.designation =
            "Designation is required";

    }


    // Department

    if (!data.department) {

        errors.department =
            "Department is required";

    }


    // College

    if (!data.college_name) {

        errors.college_name =
            "College name is required";

    }


    // Website

    const urlRegex =
        /^https?:\/\/.+/i;


    if (
        !data.college_website ||
        !urlRegex.test(data.college_website)
    ) {

        errors.college_website =
            "Enter a valid website URL beginning with http:// or https://";

    }


    return {

        valid:
            Object.keys(errors).length === 0,

        errors

    };

}


module.exports = {
    validateFaculty
};