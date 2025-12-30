import universityRepository from "../repositories/university.repository.js";

class UniversityService {
  async resolveUniversityByEmail(email) {
    const domain = email.split("@")[1];

    if (!domain) {
      throw new Error("Invalid email format");
    }

    const university = await universityRepository.findByDomain(domain);

    if (!university) {
      throw new Error("University not supported");
    }

    return university;
  }

  validateStudent(university, email, systemId) {
    const emailRegex = new RegExp(university.studentEmailRegex);
    const systemIdRegex = new RegExp(university.systemIdRegex);

    if (!emailRegex.test(email)) {
      throw new Error("Invalid student email");
    }

    if (!systemIdRegex.test(systemId)) {
      throw new Error("Invalid system ID");
    }
  }

  validateFaculty(university, email) {
    const emailRegex = new RegExp(university.facultyEmailRegex);

    if (!emailRegex.test(email)) {
      throw new Error("Invalid faculty email");
    }
  }
}

export default new UniversityService();
