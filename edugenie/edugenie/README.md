# EduGenie — Google Gemini Powered Learning Assistant

A simple web app where a student can ask for a topic explanation, a practice quiz,
or a summary of their notes, powered by the Google Gemini API. Pure HTML/CSS/JS —
no build step, no server required.

## Project files
```
edugenie/
├── index.html   # page structure
├── style.css    # visual design
├── script.js    # Gemini API calls + UI logic
└── README.md
```

## 1. Run it in VS Code
1. Open the `edugenie` folder in VS Code (`File > Open Folder`).
2. Install the **Live Server** extension (if you don't have it).
3. Right-click `index.html` → **Open with Live Server**.
4. Click the **API key** button in the top-right, paste in a free Gemini API key
   from [Google AI Studio](https://aistudio.google.com/apikey), and click **Save key**.
5. Pick a mode (Explain / Quiz / Summarize) and try it.

The key is stored only in your browser's local storage — it is never committed
to Git or sent anywhere except Google's API.

## 2. Push it to GitHub
From inside the `edugenie` folder, in the VS Code terminal:
```bash
git init
git add .
git commit -m "Initial commit: EduGenie learning assistant"
```
Then, on GitHub.com, create a new empty repository (no README, no .gitignore —
you already have both), copy the URL it gives you, and run:
```bash
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```
Refresh the GitHub page — your files should be there.

### Optional: host it for free
Once it's on GitHub, go to the repo's **Settings → Pages**, set the source branch
to `main` and folder to `/ (root)`. GitHub will give you a live `https://<username>.github.io/<repo-name>/` link in a minute or two — handy for the Skill Wallet submission below.

## 3. Upload to Skill Wallet
Skill Wallet submissions are typically either a GitHub repo link, a live hosted
link, or a zipped project folder — check what your course instance asks for and
use the matching option:
- **Repo link**: paste the GitHub URL from step 2.
- **Live link**: paste the GitHub Pages URL from the optional step above.
- **Zip upload**: right-click the `edugenie` folder → **Compress** (Mac) or
  send to a zipped folder (Windows), then upload that `.zip`.

## Notes
- This is a lean starting scaffold — the quiz/summarize/explain prompts in
  `script.js` are easy to tune to match your project documentation's exact
  requirements (e.g. adding a difficulty selector, subject dropdown, or a
  history of past answers).
- If your project documentation calls for a backend (e.g. hiding the API key
  server-side, or a database of past sessions), this frontend can be pointed
  at a small Flask/Node API instead of calling Gemini directly — say the word
  and that piece can be added.
