import prisma from "../prisma/prisma";
import { CarModel, MakeSelect, ModelSelect } from "../models/types";
import { ParsedUrlQuery } from "querystring";
import { getValueString, getValueNumber } from "../utils";

const { createJWT, isTokenValid } = require("../../lib/utils/jwt");
// import jwt from "@jsonwebtoken";
// import bcrypt from "@bcryptjs";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

export async function login({ email, password }) {
  //   const email = getValueString(query.user || "");
  //   const password = getValueString(query.password || "");

  console.log("Inside login");
  console.log(email);
  console.log(password);

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  console.log("user found result:");
  console.log(user);

  // validate if found user && compare password
  if (!user) {
    return { user: null, code: 101, message: "Invalid Credentials" };
  }
  if (!(user && bcrypt.compareSync(password, user.password))) {
    console.log(bcrypt.compareSync(password, user.password));
    return { user: null, code: 101, message: "Invalid Credentials" };
  }

  // create a jwt token that is valid for 7 days
  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  // return { cars, totalPages, totalItems };
  return { user, token };
}

export async function register(query: ParsedUrlQuery) {
  console.log("Inside register");
  console.log(query);
  const email = getValueString(query.email || "");
  const password = getValueString(query.password || "");

  const emailAlreadyExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  console.log("emailAlreadyExists");
  console.log(emailAlreadyExists);

  if (emailAlreadyExists) {
    return { user: null, code: 400, message: "User already exists" };
  }
  console.log("still here");
  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log(hashedPassword);
  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });
  console.log("user created");
  console.log(user);

  // const token = user.createJWT();
  //const token = await createJWT();
  return user;
}

export async function logout() {}
