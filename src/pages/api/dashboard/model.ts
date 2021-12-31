import { NextApiResponse, NextApiRequest } from "next";
import {
  createModel,
  deleteModel,
  getModels,
} from "../../../lib/controllers/modelController";

// GET /api/cars/
export default async function model(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      console.log(req.query);
      
      const models = await getModels(req.query.brand);
      if (!models) {
        return res.status(400).json({ message: "Brand not found." });
      }
      return res.status(200).json(models);
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        error: "Internal Server Error. Error retrieving data from database.",
      });
    }
  } else if (req.method === "POST") {
    console.log(req.body);
    
    const { brandId, modelName } = req.body;
    // CREATE BRAND
    const model = await createModel(brandId, modelName);
    console.log("result of create model");
    console.log(model);
    if (!model) {
      return res.status(400).json({ message: "model already exists." });
    } else if (model.code != 200) {
      return res.status(400).json({ message: model.message });
    }

    return res.status(200).json({ model: model, message: "New model created" });
  } else if (req.method === "DELETE") {
    const model = await deleteModel(req.body);

    return res.status(200).json({ model: model, message: "model deleted" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
