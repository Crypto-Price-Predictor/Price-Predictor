import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM users'); // Adjust the query as needed
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data', error });
    }
  // } else if (req.method === 'POST') {
  //   const { name, email } = req.body; // Example fields

  //   try {
  //     const [result] = await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
  //     res.status(201).json({ id: result.insertId, name, email });
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error inserting data', error });
  //   }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
