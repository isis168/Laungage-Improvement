export default async function handler(req, res) {
  try {
    const { answer, question } = req.body;

    if (!answer || !question) {
      return res.status(400).json({ result: "データが不足してる" });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `質問: ${question}\n回答: ${answer}\n10点満点で評価して理由も書いて`
      })
    });

    const data = await response.json();

    // データ確認（ここ重要）
    console.log(data);

    if (!data.output) {
      return res.json({ result: "AI応答エラー：" + JSON.stringify(data) });
    }

    const text = data.output[0].content[0].text;

    res.json({ result: text });

  } catch (error) {
    res.json({ result: "サーバーエラー：" + error.message });
  }
}
