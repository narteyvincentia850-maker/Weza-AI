export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { systemPrompt, messages } = req.body;

  if (!systemPrompt || !messages) {
    return res.status(400).json({ error: 'Missing systemPrompt or messages' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      return res.status(500).json({ error: 'Groq API error', details: errData });
    }

    const data = await response.json();
    res.status(200).json({ reply: data.choices?.[0]?.message?.content || '' });
  } catch (err) {
    console.error('Groq proxy error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
