import { sql, isAdmin, jsonResponse } from './_lib/db';

export const config = { runtime: 'edge' };

interface NewSupporterInput {
  name: string;
  nickname?: string;
  stance: string;
  amount: number;
  message: string;
  phone?: string;
  email?: string;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'POST') {
    const body = (await req.json()) as NewSupporterInput;
    const { name, nickname, stance, amount, message, phone, email } = body;

    if (!name || !stance || !message || typeof amount !== 'number' || amount <= 0) {
      return jsonResponse({ error: 'invalid payload' }, 400);
    }

    const id = crypto.randomUUID();

    await sql`
      INSERT INTO supporters (id, name, nickname, stance, amount, message, likes, phone, email)
      VALUES (${id}, ${name}, ${nickname ?? null}, ${stance}, ${amount}, ${message}, 1, ${phone ?? null}, ${email ?? null})
    `;
    await sql`UPDATE campaign_state SET raised = raised + ${amount}, updated_at = now() WHERE id = 1`;

    return jsonResponse({ id }, 201);
  }

  if (req.method === 'PATCH') {
    const body = (await req.json()) as { id: string; like?: boolean; amount?: number };
    const { id, like, amount } = body;
    if (!id) return jsonResponse({ error: 'missing id' }, 400);

    if (like) {
      await sql`UPDATE supporters SET likes = likes + 1 WHERE id = ${id}`;
      return jsonResponse({ ok: true });
    }

    if (!isAdmin(req)) return jsonResponse({ error: 'unauthorized' }, 401);
    if (typeof amount !== 'number' || amount <= 0) return jsonResponse({ error: 'invalid amount' }, 400);

    const [current] = await sql`SELECT amount FROM supporters WHERE id = ${id}`;
    if (!current) return jsonResponse({ error: 'not found' }, 404);

    const delta = amount - Number(current.amount);
    await sql`UPDATE supporters SET amount = ${amount} WHERE id = ${id}`;
    await sql`UPDATE campaign_state SET raised = raised + ${delta}, updated_at = now() WHERE id = 1`;

    return jsonResponse({ ok: true });
  }

  if (req.method === 'DELETE') {
    if (!isAdmin(req)) return jsonResponse({ error: 'unauthorized' }, 401);

    const body = (await req.json()) as { id: string };
    const { id } = body;
    if (!id) return jsonResponse({ error: 'missing id' }, 400);

    const [sup] = await sql`SELECT amount FROM supporters WHERE id = ${id}`;
    await sql`DELETE FROM supporters WHERE id = ${id}`;
    if (sup) {
      await sql`UPDATE campaign_state SET raised = raised - ${sup.amount}, updated_at = now() WHERE id = 1`;
    }

    return jsonResponse({ ok: true });
  }

  return jsonResponse({ error: 'method not allowed' }, 405);
}
