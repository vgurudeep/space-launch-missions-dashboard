const request = require("supertest");
const app = require("../../app");

describe("Test GET/launches", () => {
  test("It should return 200 status", async () => {
    const response = await request(app)
      .get("/launches")
      .expect(200)
      .expect("Content-Type", /json/); // Using built in SuperTest module -- simpler and clearner
    // expect(response.statusCode).toBe(200);  -->  Used by JEST
  });
});

describe("Test POST/Launch", () => {
  const completeLaunchData = {
    mission: "USSC",
    rocket: "Lol 24",
    target: "Keplar-186 f",
    launchDate: "January 30, 2030",
  };
  const launchDataWithoutDate = {
    mission: "USSC",
    rocket: "Lol 24",
    target: "Keplar-186 f",
  };

  const completeLaunchDataWithInvalidDate = {
    mission: "USSC",
    rocket: "Lol 24",
    target: "Keplar-186 f",
    launchDate: "lol",
  };
  test("It should  return 201 status", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test("It should  catch missing data error", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing important data",
    });
  });

  test("It should  catch invalid date error", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toStrictEqual({
      error: "wrong date",
    });
  });
});
