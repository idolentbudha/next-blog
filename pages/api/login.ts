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

  switch (method) {
    case "POST":
      const { email, password } = body;
      // Get data from your database
      dbCall(email, password, (err: any, data: any) => {
        if (err) {
          res.status(500).end(`Internal server error`);
        }
        res.status(200).json(data);
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

    if (!user) {
      callback("invalid user", null);
    }

    callback(null, user);
  } catch (error) {
    callback(error, null);
  }
};
