import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL!);

export function isAdmin(req: Request): boolean {
  const passcode = req.headers.get('x-admin-passcode');
  return !!passcode && !!process.env.ADMIN_PASSCODE && passcode === process.env.ADMIN_PASSCODE;
}

// Not awaited internally so callers can either `await` it standalone or
// include it unawaited inside a `sql.transaction([...])` batch.
export function adjustRaised(delta: number) {
  return sql`UPDATE campaign_state SET raised = raised + ${delta}, updated_at = now() WHERE id = 1`;
}

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
