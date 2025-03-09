import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const task = JSON.parse(await redis.get(`task:${id}`));
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.completed = !task.completed;
    await redis.set(`task:${id}`, JSON.stringify(task));
    return res.status(200).json(task);
  }

  if (req.method === "DELETE") {
    await redis.del(`task:${id}`);
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
