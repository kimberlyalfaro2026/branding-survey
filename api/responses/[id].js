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
      SELECT * FROM responses 
      WHERE survey_id = ${id}
      ORDER BY submitted_at DESC
    `;

    return res.status(200).json(rows.map(row => ({
      id: row.id,
      surveyId: row.survey_id,
      responses: typeof row.responses === 'string' ? JSON.parse(row.responses) : row.responses,
      submittedAt: row.submitted_at
    })));
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
