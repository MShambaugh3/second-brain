import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id, content, completed } = req.body;
    await redis.set(`task:${id}`, JSON.stringify({ id, content, completed }));
    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    const keys = await redis.keys("task:*");
    const tasks = await Promise.all(
      keys.map(async (key) => JSON.parse(await redis.get(key)))
    );
    return res.status(200).json(tasks);
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
