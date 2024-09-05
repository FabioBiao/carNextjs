import prisma from "../prisma/prisma";
import { CarModel, MakeSelect, ModelSelect } from "../models/types";
import { ParsedUrlQuery } from "querystring";
import { getValueString, getValueNumber } from "../utils";

export async function createBrand(brand) {
  console.log(brand);
  const brandName = getValueString(brand.brandName || "");
  const brandAlreadyExists = await prisma.brand.findUnique({
    where: {
      name: brandName,
    },
  });
  console.log(brandAlreadyExists);

  if (brandAlreadyExists) {
    return { brand: null, code: 400, message: "Brand already exists" };
  }

  const newBrand = await prisma.brand.create({
    data: {
      name: brandName,
    },
  });
  console.log("new brand created");

  console.log(newBrand);

  return { brand: newBrand, code: 200, message: "Brand created" };
}

export async function getBrands() {
  const response = await prisma.brand.findMany();
  console.log(response);

  // return { cars, totalPages, totalItems };
  return { response };
}

export async function deleteBrand(brandId) {
  console.log('deleteBrand controller');
  console.log(brandId);
  const idBrand = getValueNumber(brandId || "");

  console.log(idBrand);

  const brand = await prisma.brand.delete({
    where: { id: Number(idBrand) },
  });

  console.log(brand);

  // return { cars, totalPages, totalItems };
  return { brand };
}
