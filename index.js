const express = require("express");
const app = express();

app.get("/oauth-callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.send("No code received.");

  try {
    const response = await fetch("https://api.hubapi.com/oauth/v1/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.HUBSPOT_CLIENT_ID,
        client_secret: process.env.HUBSPOT_CLIENT_SECRET,
        redirect_uri: "https://getleadapp-production.up.railway.app/oauth-callback",
        code,
      }),
    });
    const data = await response.json();
    if (data.access_token) {
      res.send("<h2>Connected! You can close this window.</h2><script>window.close();</script>");
    } else {
      res.send(`Error: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    res.send(`Error: ${err.message}`);
  }
});

app.get("/", (req, res) => res.send("OAuth redirect server running."));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
