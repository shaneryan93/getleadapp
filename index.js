const express = require("express");
const app = express();

app.get("/oauth-callback", (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.send("No code received.");
  }
  res.send(`
    <h2>Connected!</h2>
    <p>Authorization code received. You can close this window.</p>
    <script>window.close();</script>
  `);
});

app.get("/", (req, res) => res.send("OAuth redirect server running."));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
