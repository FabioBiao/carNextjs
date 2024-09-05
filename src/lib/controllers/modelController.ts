import prisma from "../prisma/prisma";
import { CarModel, MakeSelect, ModelSelect } from "../models/types";
import { ParsedUrlQuery } from "querystring";
import { getValueString, getValueNumber } from "../utils";

export async function createModel(brandId, modelName) {
  console.log('controller model');
  console.log(brandId);
  console.log(modelName);
  const idBrand = getValueNumber(brandId || "");
  const model = getValueString(modelName || "");

  const modelAlreadyExists = await prisma.model.findUnique({
    where: {
      name: model,
    },
  });
  console.log(modelAlreadyExists);

  if (modelAlreadyExists) {
    return { brand: null, code: 400, message: "Model already exists" };
  }

  const newModel = await prisma.model.create({
    data: {
      name: model,
      brandId: idBrand,
    },
  });
  console.log("new model created");

  console.log(newModel);

  return { brand: newModel, code: 400, message: "Brand already exists" };
}

export async function getModels(brand) {
  const idBrand = getValueNumber(brand || "");
  console.log('getModels');
  console.log(idBrand);
  const response = await prisma.model.findMany({
    where: { brandId: Number(idBrand) },
  });
  console.log(response);

  // return { cars, totalPages, totalItems };
  return { response };
}

export async function deleteModel(query: ParsedUrlQuery) {
  const response = await prisma.brand.findMany();
  console.log(response);

  // return { cars, totalPages, totalItems };
  return { response };
}
