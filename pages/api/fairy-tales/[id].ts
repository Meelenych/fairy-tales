import { NextApiRequest, NextApiResponse } from 'next';
import { FairyTalesController } from '../../../controllers/fairyTales';

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

    if (req.method === 'GET') {
      const tale = await FairyTalesController.getByIdForAdmin(taleId);
      if (!tale) {
        return res.status(404).json({ error: 'Fairy tale not found' });
      }
      return res.status(200).json(tale);
    }

    if (req.method === 'PUT') {
      const { title, author, country, year, content, hidden } = req.body;

      const updateData: any = {};
      if (title !== undefined) updateData.title = title;
      if (author !== undefined) updateData.author = author;
      if (country !== undefined) updateData.country = country;
      if (year !== undefined) updateData.year = year;
      if (content !== undefined) updateData.content = content;
      if (hidden !== undefined) updateData.hidden = hidden;

      const success = await FairyTalesController.update(taleId, updateData);
      if (!success) {
        return res.status(404).json({ error: 'Fairy tale not found' });
      }

      return res.status(200).json({ message: 'Fairy tale updated successfully' });
    }

    if (req.method === 'DELETE') {
      const success = await FairyTalesController.delete(taleId);
      if (!success) {
        return res.status(404).json({ error: 'Fairy tale not found' });
      }

      return res.status(200).json({ message: 'Fairy tale deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}