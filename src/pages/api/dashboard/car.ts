import { createCar, deleteCar, getCars } from "../../../lib/controllers/carsController";
import prisma from "../../../lib/prisma/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  if (req.method === "GET") {
    try {
      const cars = await getCars(req.query);

      res.json(null);
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        error: "Internal Server Error. Error retrieving data from database.",
      });
    }
  } else if (req.method === "POST") {
    console.log('req.session post of create');
    console.log(req.session);
    const {cookies} = req;
    console.log(cookies);
    // CREATE BRAND
    const car = await createCar(req.body);
    console.log("result of create car");
    console.log(car);
    if (!car) {
      return res.status(400).json({ message: "Car already exists." });
    } else if (car.code != 200) {
      return res.status(400).json({ message: car.message });
    }

    return res.status(200).json({ car: car, message: "New Car created" });
  } else if (req.method === "DELETE") {
    console.log("delete method car");
    console.log(req.query);

    const car = await deleteCar(req.query.car);

    return res.status(200).json({ car: car, message: "Car created" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
