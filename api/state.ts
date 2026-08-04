import { sql, isAdmin, jsonResponse } from './_lib/db';

export const config = { runtime: 'edge' };

interface TimelineStepInput {
  phase: number;
  title: string;
  status: string;
  date: string;
  description: string;
  highlights: string[];
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'GET') {
    const [state] = await sql`SELECT pix_key, goal, raised FROM campaign_state WHERE id = 1`;
    const timelineSteps = await sql`
      SELECT phase, title, status, date, description, highlights
      FROM timeline_steps ORDER BY phase ASC
    `;
    const supportersRows = await sql`
      SELECT id, name, nickname, stance, amount, donated_at, message, likes, phone, email
      FROM supporters ORDER BY donated_at DESC
    `;

    return jsonResponse({
      pixKey: state?.pix_key ?? null,
      goal: state ? Number(state.goal) : null,
      raised: state ? Number(state.raised) : null,
      timelineSteps: timelineSteps.map((t) => ({
        phase: t.phase,
        title: t.title,
        status: t.status,
        date: t.date,
        description: t.description,
        highlights: t.highlights,
      })),
      supporters: supportersRows.map((s) => ({
        id: s.id,
        name: s.name,
        nickname: s.nickname ?? undefined,
        stance: s.stance,
        amount: Number(s.amount),
        date: new Date(s.donated_at).toLocaleDateString('pt-BR'),
        message: s.message,
        likes: s.likes,
        phone: s.phone ?? undefined,
        email: s.email ?? undefined,
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
      timelineSteps: TimelineStepInput[];
    };

    await sql`
      UPDATE campaign_state
      SET pix_key = ${pixKey}, goal = ${goal}, raised = ${raised}, updated_at = now()
      WHERE id = 1
    `;

    await sql`DELETE FROM timeline_steps`;
    for (const step of timelineSteps) {
      await sql`
        INSERT INTO timeline_steps (phase, title, status, date, description, highlights)
        VALUES (${step.phase}, ${step.title}, ${step.status}, ${step.date}, ${step.description}, ${JSON.stringify(step.highlights)}::jsonb)
      `;
    }

    return jsonResponse({ ok: true });
  }

  return jsonResponse({ error: 'method not allowed' }, 405);
}
