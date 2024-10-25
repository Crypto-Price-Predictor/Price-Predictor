import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const ID  = req.query.portfolioID;
      const trades = await prisma.trades.findMany({where: {Portfolio_ID: Number(ID)}})
      res.status(200).json(trades);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error getting user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}