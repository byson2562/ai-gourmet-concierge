import axios from "axios";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    try {
      // OpenAI API にリクエストを送信
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini", // モデルを指定
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      // APIのレスポンスを返却
      res
        .status(200)
        .json({ message: response.data.choices[0].message.content });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "OpenAI APIリクエストに失敗しました" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
