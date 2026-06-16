const express = require("express");
const cors = require("cors");
const scrapeSauceDemo = require("./scraper");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.post("/scrape", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required"
      });
    }

    const data = await scrapeSauceDemo(
      username,
      password
    );

    res.json({
      success: true,
      products: data
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.listen(5000, () => {
  console.log(
    "Server running on http://localhost:5000"
  );
});