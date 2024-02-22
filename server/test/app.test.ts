import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import "mocha";
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

    expect(response.status).to.equal(409);
  });

  it("should test for Email sender ", async () => {
    const passwordlink = {
      email: "hannah57@gmail.com",
    };
    const response = await chai
      .request(app)
      .post("/api/v1/wallet/send-email")
      .send(passwordlink);
    // console.log(response.body);
    expect(response.status).to.equal(200);
  });

  it("should send password reset email", async () => {
    const sendemaillink = {
      email: "jacklinetimah57@gmail.com",
    };
    const response = await chai
      .request(app)
      .post("/api/v1/wallet/resetemail-link")
      .send(sendemaillink);
    expect(response.status).to.equal(200);
  });
});

// //Testing error message for the sending of email
// describe("Testing Express Endpoints", () => {
//   it("should test for Email sender failure", async () => {
//     const resetpasswordlink = {
//       email: "jasonappiatu@gmail.com",
//     };
//     const response = await chai
//       .request(app)
//       .post("/api/v1/wallet/send-email")
//       .send(resetpasswordlink);
//     console.log(response.body);
//     expect(response.status).to.equal(500);
//   });
// });
