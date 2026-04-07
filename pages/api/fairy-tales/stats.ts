import { NextApiRequest, NextApiResponse } from 'next';
import { FairyTalesController } from '../../../controllers/fairyTales';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const stats = await FairyTalesController.getStats();
      return res.status(200).json(stats);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}