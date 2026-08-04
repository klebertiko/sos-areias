import { isAdmin, jsonResponse } from './_lib/db';

export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return jsonResponse({ error: 'method not allowed' }, 405);
  if (!isAdmin(req)) return jsonResponse({ error: 'unauthorized' }, 401);
  return jsonResponse({ ok: true });
}
