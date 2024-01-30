import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import 'mocha';
chai.use(chaiHttp);
describe("Testing Express Endpoints", () => {
  it("should test for create user", async () => {
    const registerNewUser = {
      firstname: "Jackline",
      surname: "Timah",
      othernames: "Amma",
      phonenumber: "+233541885636",
      email: "jackline@gmail.com",
      password: "Jackline123",
    };
    const response = await chai
      .request(app)
      .post("/api/v1/wallet/signup")
      .send(registerNewUser);
    console.log(response.body);
    expect(response.status).to.equal(500);
    // Additional assertions can be added based on your specific use case
    // For example, you might want to check the response body or headers
    // For instance, if you expect a specific error message in the response:
    // expect(response.body).to.have.property('message', 'SomeExpectedErrorMessage');
  });
});
