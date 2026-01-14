import universityRepository from "../repositories/university.repository.js";
import AppError from "../utils/appError.js";

class UniversityService {
  async resolveUniversityByEmail(email) {
    const domain = email.split("@")[1];

    if (!domain) {
      throw new AppError("Invalid email format",400);
    }

    const university = await universityRepository.findByDomain(domain);

    if (!university) {
      throw new AppError("University not supported",400);
    }

    return university;
  }

  validateStudent(university, email, systemId) {
    const emailRegex = new RegExp(university.studentEmailRegex);
    const systemIdRegex = new RegExp(university.systemIdRegex);

    if (!emailRegex.test(email)) {
      throw new AppError("Invalid student email",400);
    }

    if (!systemIdRegex.test(systemId)) {
      throw new AppError("Invalid system ID",400);
    }
  }

  validateFaculty(university, email) {
    const emailRegex = new RegExp(university.facultyEmailRegex);

    if (!emailRegex.test(email)) {
      throw new AppError("Invalid faculty email",400);
    }
  }
}

export default new UniversityService();
