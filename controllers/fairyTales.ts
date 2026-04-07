import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { FairyTale } from '../types/fairyTale';

export type { FairyTale };

export class FairyTalesController {
  private static async getDb() {
    return await open({
      filename: './fairy-tales.db',
      driver: sqlite3.Database,
    });
  }

  static async getAll(): Promise<FairyTale[]> {
    const db = await this.getDb();
    try {
      const tales = await db.all<FairyTale[]>('SELECT * FROM fairy_tales WHERE hidden = 0 ORDER BY clicks DESC');
      return tales;
    } finally {
      await db.close();
    }
  }

  static async getAllForAdmin(): Promise<FairyTale[]> {
    const db = await this.getDb();
    try {
      const tales = await db.all<FairyTale[]>('SELECT * FROM fairy_tales ORDER BY clicks DESC');
      return tales;
    } finally {
      await db.close();
    }
  }

  static async getById(id: number): Promise<FairyTale | null> {
    const db = await this.getDb();
    try {
      const tale = await db.get<FairyTale>('SELECT * FROM fairy_tales WHERE id = ? AND hidden = 0', id);
      if (tale) {
        // Increment click count
        await db.run('UPDATE fairy_tales SET clicks = clicks + 1 WHERE id = ?', id);
        tale.clicks += 1;
      }
      return tale || null;
    } finally {
      await db.close();
    }
  }

  static async getByIdForAdmin(id: number): Promise<FairyTale | null> {
    const db = await this.getDb();
    try {
      const tale = await db.get<FairyTale>('SELECT * FROM fairy_tales WHERE id = ?', id);
      return tale || null;
    } finally {
      await db.close();
    }
  }

  static async create(taleData: Omit<FairyTale, 'id' | 'clicks'>): Promise<number> {
    const db = await this.getDb();
    try {
      const result = await db.run(
        'INSERT INTO fairy_tales (title, author, country, year, content, clicks, hidden) VALUES (?, ?, ?, ?, ?, 0, ?)',
        [taleData.title, taleData.author || null, taleData.country || null, taleData.year || null, taleData.content, taleData.hidden ? 1 : 0]
      );
      return result.lastID!;
    } finally {
      await db.close();
    }
  }

  static async update(id: number, taleData: Partial<Omit<FairyTale, 'id' | 'clicks'>>): Promise<boolean> {
    const db = await this.getDb();
    try {
      const fields = [];
      const values = [];

      if (taleData.title !== undefined) {
        fields.push('title = ?');
        values.push(taleData.title);
      }
      if (taleData.author !== undefined) {
        fields.push('author = ?');
        values.push(taleData.author);
      }
      if (taleData.country !== undefined) {
        fields.push('country = ?');
        values.push(taleData.country);
      }
      if (taleData.year !== undefined) {
        fields.push('year = ?');
        values.push(taleData.year);
      }
      if (taleData.content !== undefined) {
        fields.push('content = ?');
        values.push(taleData.content);
      }
      if (taleData.hidden !== undefined) {
        fields.push('hidden = ?');
        values.push(taleData.hidden ? 1 : 0);
      }

      if (fields.length === 0) return false;

      values.push(id);
      const result = await db.run(
        `UPDATE fairy_tales SET ${fields.join(', ')} WHERE id = ?`,
        values
      );

      return result.changes! > 0;
    } finally {
      await db.close();
    }
  }

  static async delete(id: number): Promise<boolean> {
    const db = await this.getDb();
    try {
      const result = await db.run('DELETE FROM fairy_tales WHERE id = ?', id);
      return result.changes! > 0;
    } finally {
      await db.close();
    }
  }

  static async toggleVisibility(id: number): Promise<boolean> {
    const db = await this.getDb();
    try {
      const result = await db.run(
        'UPDATE fairy_tales SET hidden = CASE WHEN hidden = 1 THEN 0 ELSE 1 END WHERE id = ?',
        id
      );
      return result.changes! > 0;
    } finally {
      await db.close();
    }
  }

  static async getStats() {
    const db = await this.getDb();
    try {
      const totalTales = await db.get<{ count: number }>('SELECT COUNT(*) as count FROM fairy_tales');
      const visibleTales = await db.get<{ count: number }>('SELECT COUNT(*) as count FROM fairy_tales WHERE hidden = 0');
      const hiddenTales = await db.get<{ count: number }>('SELECT COUNT(*) as count FROM fairy_tales WHERE hidden = 1');
      const mostPopular = await db.all<FairyTale[]>('SELECT * FROM fairy_tales WHERE hidden = 0 ORDER BY clicks DESC LIMIT 5');

      return {
        total: totalTales!.count,
        visible: visibleTales!.count,
        hidden: hiddenTales!.count,
        mostPopular,
      };
    } finally {
      await db.close();
    }
  }
}