import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, userId } = req.body;
      const newUser = await prisma.portfolioUser.create({
        data: {
          name: name,
          User_ID: Number(userId),
        },
      });
      res.status(200).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

// // /pages/api/portfolio.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const userID = Number(req.query.userId);
//   console.log(userID)
  
//   if (!userID) {
//     return res.status(400).json({ error: 'User ID is required' });
//   }
// //   try {
//     console.log("in portfolio.ts")
//     const portfolio = await prisma.portfolioUser.findMany({
//         where: { id: userID },
//     });

//     if (portfolio.length === 0) {
//         return res.status(404).json({ message: 'Portfolio not found' });
//     }
//     res.status(200).json(portfolio);
//     // } catch (err) {
//     //     return res.status(404).json({ message: 'Portfolio not found' })
//     // }
// }
