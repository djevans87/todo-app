require("dotenv").config();
const { connectToMongoDB } = require("./database");

const express = require("express");

const app = express();
app.use(express.json());

const todosRouter = require("./routes/todoRoutes");
const mainRouter = require("./routes/mainRoutes");

app.use("/api", todosRouter);
app.use("/", mainRouter);

const port = process.env.PORT || 5000;

async function startServer() {
  await connectToMongoDB();
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
}

startServer();
