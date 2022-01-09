// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MakeHash } from "../../utils/hash";
import prisma from "../../utils/prisma";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query, method, body } = req;
  //   console.log(body)
  switch (method) {
    case "POST":
      console.log("body:", body);
      // Get data from your database
      dbCall(body, (err: any, data: any) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.status(200).json(data);
        return;
      });

      break;
    default:
      //   res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

interface Payload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
  address: string;
  role: "USER" | "ADMIN";
}

const dbCall = async (payload: Payload, callback: Function) => {
  try {
    const { email, password, firstName, lastName, address, middleName, role } =
      payload;
    const user = await prisma.user.create({
      data: {
        email: email,
        password: await MakeHash(password),
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        address: address,
        role: role,
        updatedAt: new Date(),
      },
    });
    console.log("user:", user);
    if (!user) {
      callback("invalid user", null);
    }

    callback(null, user);
  } catch (error) {
    console.log("error:", error);
    callback(error, null);
  }
};
