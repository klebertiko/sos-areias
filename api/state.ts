import { sql, isAdmin, jsonResponse } from './_lib/db';
import { TimelineStep } from '../src/types';

export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'GET') {
    const admin = isAdmin(req);
    const [[state], timelineSteps, supportersRows] = await Promise.all([
      sql`SELECT pix_key, goal, raised FROM campaign_state WHERE id = 1`,
      sql`
        SELECT phase, title, status, date, description, highlights
        FROM timeline_steps ORDER BY phase ASC
      `,
      sql`
        SELECT id, name, nickname, stance, amount, donated_at, message, likes, phone, email
        FROM supporters ORDER BY donated_at DESC
      `,
    ]);

    return jsonResponse({
      pixKey: state?.pix_key ?? null,
      goal: state ? Number(state.goal) : null,
      raised: state ? Number(state.raised) : null,
      timelineSteps,
      supporters: supportersRows.map((s) => ({
        id: s.id,
        name: s.name,
        nickname: s.nickname ?? undefined,
        stance: s.stance,
        amount: Number(s.amount),
        date: new Date(s.donated_at).toLocaleDateString('pt-BR'),
        message: s.message,
        likes: s.likes,
        phone: admin ? (s.phone ?? undefined) : undefined,
        email: admin ? (s.email ?? undefined) : undefined,
      })),
    });
  }

  if (req.method === 'PUT') {
    if (!isAdmin(req)) return jsonResponse({ error: 'unauthorized' }, 401);

    const body = await req.json();
    const { pixKey, goal, raised, timelineSteps } = body as {
      pixKey: string;
      goal: number;
      raised: number;
      timelineSteps: TimelineStep[];
    };

    await sql.transaction([
      sql`
        UPDATE campaign_state
        SET pix_key = ${pixKey}, goal = ${goal}, raised = ${raised}, updated_at = now()
        WHERE id = 1
      `,
      sql`DELETE FROM timeline_steps`,
      ...timelineSteps.map(
        (step) => sql`
          INSERT INTO timeline_steps (phase, title, status, date, description, highlights)
          VALUES (${step.phase}, ${step.title}, ${step.status}, ${step.date}, ${step.description}, ${JSON.stringify(step.highlights)}::jsonb)
        `
      ),
    ]);

    return jsonResponse({ ok: true });
  }

  return jsonResponse({ error: 'method not allowed' }, 405);
}
