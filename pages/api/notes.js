import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, content } = req.body;
    await redis.set(`note:${id}`, content);
    return res.status(200).json({ success: true });
  }

  if (req.method === 'GET') {
    const keys = await redis.keys('note:*');
    const notes = await Promise.all(keys.map(async (key) => {
      return { id: key.replace('note:', ''), content: await redis.get(key) };
    }));
    return res.status(200).json(notes);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    await redis.del(`note:${id}`);
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
