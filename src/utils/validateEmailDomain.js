export const validateEmailDomain = (email) =>{
    const studentDomain = "@ug.sharda.ac.in";
    const facultyDomain = "@sharda.ac.in";

    if(email.endsWith(studentDomain)){
        return {valid:true, role:"STUDENT"};
    }

    if(email.endsWith(facultyDomain)){
        return {valid:true, role:"FACULTY"};
    }

    return {valid:false, role:"null"};
}