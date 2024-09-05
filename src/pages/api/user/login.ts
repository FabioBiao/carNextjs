import { NextApiResponse, NextApiRequest } from "next";
import { Cookie } from "next-auth/core/lib/cookie";
import { login as loginLib } from "../../../lib/controllers/usersController";
import cookie from "cookie";

interface User {
  user: any;
  message: string;
  code: number;
}

export type NextApiResponseWithCookie = NextApiResponse & {
  cookie: Cookie;
};

export default async function login(req: NextApiRequest, res: any) {
  if (req.method === "POST") {
    try {
      console.log("Login Post");
      console.log(req.body);
      const { email, password } = req.body;

      const { user, message } = await loginLib({
        email: email,
        password: password,
      });

      console.log("result from login lib");
      console.log(user);
      console.log(message);

      if (!user) {
        return res.status(400).json({ message: message });
      }
      if (user.code == 400) {
        return res.status(400).json({ message: user.message });
      }
      res.setHeader("set-cookie", "teste");
      const oneDay = 1000 * 60 * 60 * 24;
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("tokenFa", "testesdsf", {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          signed: true,
          maxAge: 60 * 60,
          expires: new Date(Date.now() + oneDay),
          sameSite: "strict", // "strict",
          path: "/",
        })
      );

      return res.status(200).json({ user: user, code: "OK" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        error: "Internal Server Error. Error retrieving data from database.",
      });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
