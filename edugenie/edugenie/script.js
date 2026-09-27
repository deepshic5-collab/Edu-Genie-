const modeLabels = {
  explain: "What topic should I explain?",
  quiz: "What topic should I quiz you on?",
  summarize: "Paste the notes you want summarized",
};

const modePrompts = {
  explain: (text) =>
    `Explain the following topic clearly to a college student, with a short example: ${text}`,
  quiz: (text) =>
    `Create a 5-question multiple choice quiz (with the correct answers listed at the end) on this topic: ${text}`,
  summarize: (text) =>
    `Summarize the following notes into clear, concise bullet points:\n\n${text}`,
};

let currentMode = "explain";

const toolButtons = document.querySelectorAll(".tool-btn");
const inputLabel = document.getElementById("inputLabel");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const output = document.getElementById("output");

const keyBtn = document.getElementById("keyBtn");
const keyDialog = document.getElementById("keyDialog");
const apiKeyInput = document.getElementById("apiKeyInput");
const saveKeyBtn = document.getElementById("saveKeyBtn");

toolButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    toolButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentMode = btn.dataset.mode;
    inputLabel.textContent = modeLabels[currentMode];
  });
});

keyBtn.addEventListener("click", () => {
  apiKeyInput.value = localStorage.getItem("edugenie_api_key") || "";
  keyDialog.showModal();
});

keyDialog.addEventListener("close", () => {
  if (keyDialog.returnValue === "save" && apiKeyInput.value.trim()) {
    localStorage.setItem("edugenie_api_key", apiKeyInput.value.trim());
  }
});

sendBtn.addEventListener("click", async () => {
  const text = userInput.value.trim();
  if (!text) return;

  const apiKey = localStorage.getItem("edugenie_api_key");
  if (!apiKey) {
    output.innerHTML = `<p class="error">Add your Gemini API key first (top-right button) — it's free from Google AI Studio.</p>`;
    return;
  }

  sendBtn.disabled = true;
  sendBtn.textContent = "Thinking…";
  output.innerHTML = `<p class="placeholder">Working on it…</p>`;

  try {
    const reply = await askGemini(modePrompts[currentMode](text), apiKey);
    output.textContent = reply;
  } catch (err) {
    output.innerHTML = `<p class="error">${err.message}</p>`;
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "Ask EduGenie";
  }
});

async function askGemini(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    throw new Error(
      errBody?.error?.message || `Gemini API error (status ${response.status})`
    );
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || "No response text was returned. Try rephrasing your question.";
}
