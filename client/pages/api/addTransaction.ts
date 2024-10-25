import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { type, Portfolio, amount, price, coin } = req.body;
      const newUser = await prisma.trades.create({
        data: {
          type: type,
          Portfolio_ID: Portfolio,
          initial_amount : Number(amount).toFixed(2),
          boughtPrice : Number(price).toFixed(2),
          date: new Date(),
          profit: 0,
          coin: coin,
        },
      });
      res.status(200).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating transaction" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
