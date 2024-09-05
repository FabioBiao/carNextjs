import prisma from "../prisma/prisma";
import { CarModel, MakeSelect, ModelSelect } from "../models/types";
import { ParsedUrlQuery } from "querystring";
import { getValueString, getValueNumber, getValueBoolean } from "../utils";
import { fuelEnum } from "../utils/constants";

export async function getCars(query: ParsedUrlQuery) {
  const brand = getValueString(query.make || "");
  const model = getValueString(query.model || "");
  const minPrice = getValueNumber(query.minPrice || "");
  const maxPrice = getValueNumber(query.maxPrice || "");

  const response = await prisma.car.findMany();
  console.log(response);

  // return { cars, totalPages, totalItems };
  return { response };
}

export async function createCar(query: ParsedUrlQuery) {
  const user = getValueNumber(query.user || "");
  const brandId = getValueNumber(query.make || "");
  const modelId = getValueNumber(query.model || "");
  const published = getValueBoolean(true);
  const year = getValueNumber(query.year || "");
  const fuel = getValueString(query.fuel || "");
  const miles = getValueNumber(query.miles || "");
  const cilindrada = getValueNumber(query.cilindrada || "");
  const pontency = getValueNumber(query.pontency || "");
  const color = getValueString(query.color || "");
  const doors = getValueNumber(query.doors || "");
  const details = getValueString(query.details || "");
  const price = getValueString(query.price || "");
  const photoUrl = getValueString(query.photoUrl || "");


  const fuelE = fuelEnum[fuel];
  console.log(fuelE);
  
  // type MyEnum = typeof MyEnum[keyof typeof MyEnum]
  // type fuelEnum = typeof fuelEnum[fuel typeof fuel];

  const newCar = await prisma.car.create({
    data: {
      userId: user,
      brandId: brandId,
      modelId: modelId,
      published: published,
      year: year,
      fuel: fuelE,
      miles: miles,
      cilindrada: cilindrada,
      pontency: pontency,
      color: color,
      doors: doors,
      details: details,
      price: price,
      photoUrl,
    },
  });

  console.log("new car created");
  console.log(newCar);

  return { car: newCar, code: 200, message: "New Car created" };
}

export async function deleteCar(query: ParsedUrlQuery) {
  const carId = getValueNumber(query.id || "");
  // validate user

  // delete car if user is owner or admin

  const deletedCar = await prisma.brand.delete({
    where: { id: Number(carId) },
  });
  console.log(deletedCar);
  return { deletedCar };
}
