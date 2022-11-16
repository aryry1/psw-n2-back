const express = require("express");
const bodyParser = require("body-parser");
const util = require("util");
const request = require("request");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

const get = util.promisify(request.get);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/trends", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const requestConfig = {
    url: "https://api.twitter.com/1.1/trends/place.json?id=23424768",
    auth: {
      bearer: token,
    },
  };

  try {
    const { body } = await get(requestConfig);

    const data = JSON.parse(body)[0];

    return res.status(200).json({ data });
  } catch (err) {
    return res.status(400).json({ err });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
