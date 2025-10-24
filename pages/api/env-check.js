// pages/api/env-check.js
export default function handler(req, res) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE ||
    '';

  // Try to decode the token role (optional)
  let role = null;
  try {
    const part = key.split('.')[1];
    if (part) role = JSON.parse(Buffer.from(part, 'base64').toString('utf8'))?.role ?? null;
  } catch {}

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    hasUrl: !!url,
    hasServiceKey: !!key,
    keyLength: key.length,
    decodedRole: role, // should be "service_role"
    note: 'This endpoint does not contact Supabase—just reports env presence.',
  });
}
