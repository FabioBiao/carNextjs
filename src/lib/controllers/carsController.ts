import db from "../prisma/prisma";
import { CarModel, MakeSelect, ModelSelect } from "../models/Car";
import { ParsedUrlQuery } from "querystring";
import { getValueString, getValueNumber } from "../utils";

export async function getMakes() {
//   return await db<MakeSelect[]>("cars")
//     .select(db.ref("make").as("name"))
//     .count("make", { as: "count" })
//     .groupBy("make");
}

export async function getCars(query: ParsedUrlQuery) {
  const make = getValueString(query.make || "");
  const model = getValueString(query.model || "");
  const minPrice = getValueNumber(query.minPrice || "");
  const maxPrice = getValueNumber(query.maxPrice || "");

  const response = await db.car.findMany();
  console.log(response);

  // return { cars, totalPages, totalItems };
  return { response };
}
