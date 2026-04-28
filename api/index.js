// Placeholder — overwritten by `npm run build` (see script/build.ts).
export default async function handler(req, res) {
  res.status(503).json({ error: "Not built" });
}
