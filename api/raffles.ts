import { sql, isAdmin, jsonResponse } from './_lib/db';

export const config = { runtime: 'edge' };

interface NewRaffleInput {
  id?: string;
  title: string;
  description: string;
  url: string;
  status: 'ativa' | 'encerrada';
}

export default async function handler(req: Request): Promise<Response> {
  if (!isAdmin(req)) return jsonResponse({ error: 'unauthorized' }, 401);

  if (req.method === 'POST') {
    const body = (await req.json()) as NewRaffleInput;
    const { title, description, url, status } = body;

    if (!title || !description || !url || (status !== 'ativa' && status !== 'encerrada')) {
      return jsonResponse({ error: 'invalid payload' }, 400);
    }

    const id = body.id ?? crypto.randomUUID();

    await sql`
      INSERT INTO raffles (id, title, description, url, status)
      VALUES (${id}, ${title}, ${description}, ${url}, ${status})
    `;

    return jsonResponse({ id }, 201);
  }

  if (req.method === 'PATCH') {
    const body = (await req.json()) as { id: string } & Partial<NewRaffleInput>;
    const { id, title, description, url, status } = body;
    if (!id) return jsonResponse({ error: 'missing id' }, 400);

    const [current] = await sql`SELECT id FROM raffles WHERE id = ${id}`;
    if (!current) return jsonResponse({ error: 'not found' }, 404);

    await sql`
      UPDATE raffles
      SET title = COALESCE(${title ?? null}, title),
          description = COALESCE(${description ?? null}, description),
          url = COALESCE(${url ?? null}, url),
          status = COALESCE(${status ?? null}, status)
      WHERE id = ${id}
    `;

    return jsonResponse({ ok: true });
  }

  if (req.method === 'DELETE') {
    const body = (await req.json()) as { id: string };
    const { id } = body;
    if (!id) return jsonResponse({ error: 'missing id' }, 400);

    await sql`DELETE FROM raffles WHERE id = ${id}`;
    return jsonResponse({ ok: true });
  }

  return jsonResponse({ error: 'method not allowed' }, 405);
}
