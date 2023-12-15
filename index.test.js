const { PubSub } = require("@google-cloud/pubsub");

const pubsub = new PubSub({
  projectId: "localhost",
  apiEndpoint: "http://localhost:8085",
});

const subscription = pubsub.subscription("my-subscription");

describe("Pub/Sub Emulator", () => {
  it("should be able to receive messages", async () => {
    // Crear una promesa para manejar la recepción del mensaje
    const messagePromise = new Promise((resolve) => {
      subscription.on("message", (message) => {
        console.log(`Received message ${message.data.toString()}:`);
        message.ack();
        resolve(message.data.toString());
      });
    });

    // Enviar un mensaje a la suscripción
    await pubsub.topic("my-topic").publishMessage({
      data: Buffer.from("Hello, world!"),
    });

    // Esperar a que se resuelva la promesa de recepción del mensaje
    const receivedMessage = await messagePromise;

    expect(receivedMessage).toEqual("Hello, world!");
  });
});
