import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const { id } = req.query;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { rows } = await sql`
      SELECT * FROM surveys WHERE id = ${id}
    `;

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    return res.status(200).json({
      id: rows[0].id,
      month: rows[0].month,
      createdAt: rows[0].created_at
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
