import express, { Request, Response } from "express";
const app = express();

// Define a route with type annotations for Request and Response
app.get("/", (req: Request, res: Response): void => {
  res.send("Express on Vercel");
});

// Listen for requests on port 3000 (Vercel will provide its own port in production)
app.listen(3000, () => {
  console.info("Server ready on port 3000.");
});

export default app; // Use ES module export instead of CommonJS
