import University from "../models/university.model.js";

class UniversityRepository {
  async findByDomain(domain) {
    return University.findOne({
      domains: domain,
      status: "ACTIVE",
    });
  }

  async findByCode(code) {
    return University.findOne({ code, status: "ACTIVE" });
  }

  async create(data) {
    return University.create(data);
  }

  async findById(id) {
    return University.findById(id);
  }
}

export default new UniversityRepository();
