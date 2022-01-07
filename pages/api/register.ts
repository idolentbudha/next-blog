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
//   console.log(body)
  switch (method) {
    case "POST":
        // console.log(body)
      // Get data from your database
      dbCall(body, (err: any, data: any) => {
        console.log(body)
        if (err) {
          res.status(500).end(err);
        }
        res.status(200).json(data);
      });

      break;
    default:
      //   res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

interface Payload {email:string , password:string, firstName:string, lastName:string, middleName:string, address:string, role:any}

const dbCall = async (data:Payload, callback: Function) => {
  try {
        const {email , password, firstName, lastName, address, middleName, role} = data;
        const user = await prisma.user.create({
            data: { email: email , password: password, firstName: firstName, lastName: lastName, middleName: middleName, address: address , role: role,updatedAt: '2022-02-01 10:00:00'},
        });
        console.log(user)
    if (!user) {
      callback("invalid user", null);   
    }

    callback(null, user);
  } catch (error) {
    callback(error, null);
  }
};
