// /api/subscribe.js
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Neon은 SSL 필요
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { email, kind, website } = req.body || {};

    // honeypot (봇 방지)
    if (website) return res.status(200).json({ ok: true });

    // 입력 검증
    const KINDS = ["DOWNLOAD", "HELPER"];
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "이메일 형식이 올바르지 않습니다." });
    }
    if (!KINDS.includes(kind)) {
        return res.status(400).json({ error: "유효하지 않은 신청 종류입니다." });
    }

    try {
        await pool.query(
            "insert into leads (email, kind) values ($1, $2) on conflict (email, kind) do nothing",
            [email, kind]
        );
        return res.status(200).json({ ok: true });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "저장에 실패했습니다." });
    }
}
