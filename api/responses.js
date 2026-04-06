import { sql } from '@vercel/postgres';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { surveyId, responses, submittedAt } = req.body;

    if (!surveyId || !responses) {
      return res.status(400).json({ error: 'Survey ID and responses are required' });
    }

    const id = nanoid(10);
    
    await sql`
      INSERT INTO responses (id, survey_id, responses, submitted_at)
      VALUES (${id}, ${surveyId}, ${JSON.stringify(responses)}, ${submittedAt || new Date().toISOString()})
    `;

    return res.status(201).json({
      id,
      surveyId,
      message: 'Response submitted successfully'
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
