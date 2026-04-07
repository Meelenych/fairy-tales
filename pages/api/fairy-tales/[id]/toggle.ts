import { NextApiRequest, NextApiResponse } from 'next';
import { FairyTalesController } from '../../../../controllers/fairyTales';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const taleId = parseInt(id, 10);
    if (isNaN(taleId)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    if (req.method === 'PATCH') {
      const success = await FairyTalesController.toggleVisibility(taleId);
      if (!success) {
        return res.status(404).json({ error: 'Fairy tale not found' });
      }

      return res.status(200).json({ message: 'Visibility toggled successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}