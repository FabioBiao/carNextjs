import { NextApiResponse, NextApiRequest } from "next";
import {
  createBrand,
  getBrands,
  deleteBrand,
} from "../../../lib/controllers/brandController";

// GET /api/cars/
export default async function brand(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const brands = await getBrands();
      if (!brands) {
        return res.status(400).json({ message: "Brand not found." });
      }
      return res.status(200).json(brands);
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        error: "Internal Server Error. Error retrieving data from database.",
      });
    } 
  } else if (req.method === "POST") {
    // CREATE BRAND
    const brand = await createBrand(req.body);
    console.log("result of brands");
    console.log(brand);
    if (!brand) {
      return res.status(400).json({ message: "Brand already exists." });
    } else if (brand.code != 200) {
      return res.status(400).json({ message: brand.message });
    }

    return res.status(200).json({ brand: brand, message: "New brand created" });
  } else if (req.method === "DELETE") {
    console.log("delete method brand");
    console.log(req.query);

    const model = await deleteBrand(req.query.brand);

    return res.status(200).json({ brand: brand, message: "Brand deleted" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
