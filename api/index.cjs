import express from "express";
const app = express();
const port = 3000;
app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(port, () => console.log("Server ready on port 3000."));

module.exports = app;