import { sql } from '@vercel/postgres';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET all surveys
    if (req.method === 'GET') {
      const { rows } = await sql`
        SELECT s.*, COUNT(r.id) as response_count
        FROM surveys s
        LEFT JOIN responses r ON s.id = r.survey_id
        GROUP BY s.id
        ORDER BY s.created_at DESC
      `;
      
      return res.status(200).json(rows.map(row => ({
        id: row.id,
        month: row.month,
        createdAt: row.created_at,
        responseCount: parseInt(row.response_count)
      })));
    }

    // POST create new survey
    if (req.method === 'POST') {
      const { month } = req.body;
      
      if (!month) {
        return res.status(400).json({ error: 'Month is required' });
      }

      const id = nanoid(10);
      
      await sql`
        INSERT INTO surveys (id, month, created_at)
        VALUES (${id}, ${month}, NOW())
      `;

      return res.status(201).json({
        id,
        month,
        createdAt: new Date().toISOString()
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
