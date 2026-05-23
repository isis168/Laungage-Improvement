export default async function handler(req, res) {
  const { answer, question } = req.body;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: `
以下の文章を評価してください。

【質問】
${question}

【回答】
${answer}

0〜10点で採点し、理由も書いてください。
`
    })
  });

  const data = await response.json();
  res.json({ result: data.output[0].content[0].text });
}
