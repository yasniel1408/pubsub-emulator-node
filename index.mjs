import express from "express";
import { PubSub } from "@google-cloud/pubsub";

const app = express();
const port = 8000;

const pubsub = new PubSub({
  projectId: "localhost", // Asegúrate de usar el mismo proyecto que configuraste para el emulador
  apiEndpoint: "http://localhost:8085", // La dirección y puerto del emulador
});

const subscription = pubsub.subscription("my-subscription");
subscription.on("message", (message) => {
  console.log(`Nuevo mensaje: ${message.data}`);
  message.ack();
});

app.get("/", (req, res) => {
  res.send("Servidor en ejecución");
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
