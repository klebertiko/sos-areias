import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL!);

export function isAdmin(req: Request): boolean {
  const passcode = req.headers.get('x-admin-passcode');
  return !!passcode && !!process.env.ADMIN_PASSCODE && passcode === process.env.ADMIN_PASSCODE;
}

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
