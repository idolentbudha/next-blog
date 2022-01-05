// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query, method, body } = req;
  let response: any = { status: false, message: "something went wrong" };

  switch (method) {
    case "POST":
      const { email, password } = body;

      // Get data from your database
      dbCall(email, password, (err: any, data: any) => {
        if (err) {
          response["message"] = err;
          res.status(422).json(response);
          return;
        }
        response = { status: true, message: "login successfull" };
        res.status(200).json(data);
        return;
      });

      break;
    default:
      //   res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const dbCall = async (email: string, password: string, callback: Function) => {
  try {
    console.log("email:", email);
    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log("user:", user);

    if (user) {
      if (user.password === password) callback(null, user);
    }

    callback("invalid user", null);
  } catch (error) {
    callback(error, null);
  }
};
