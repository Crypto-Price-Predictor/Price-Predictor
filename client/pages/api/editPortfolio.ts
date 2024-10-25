import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const {portfolioID, name}  = req.body;
      const portfolio = await prisma.portfolioUser.update({ where: { id: portfolioID },  // Find user with id 1
        data: {
          name: name,  // Update the email field
          modifiedDate: new Date(),
        },})
      res.status(200).json(portfolio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error editing portfolio" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}