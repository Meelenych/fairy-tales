import { NextApiRequest, NextApiResponse } from 'next';
import { FairyTalesController } from '../../../controllers/fairyTales';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const tales = await FairyTalesController.getAllForAdmin();
      return res.status(200).json(tales);
    }

    if (req.method === 'POST') {
      const { title, author, country, year, content, hidden } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }

      const taleData = {
        title: title.trim(),
        author: author?.trim() || null,
        country: country?.trim() || null,
        year: year ? parseInt(year, 10) : undefined,
        content: content.trim(),
        hidden: Boolean(hidden),
      };

      const newId = await FairyTalesController.create(taleData);
      return res.status(201).json({
        message: 'Fairy tale created successfully',
        id: newId
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}