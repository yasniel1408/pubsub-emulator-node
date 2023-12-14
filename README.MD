1- Crear variable de entorno para el pubsub fake

```
    export PUBSUB_EMULATOR_HOST=localhost:8085
    export PUBSUB_PROJECT_ID=my-local-project

```

2- Crear el topico y la subscripcion

```
    gcloud pubsub topics create my-topic
    gcloud pubsub subscriptions create my-subscription --topic my-topic

```

3- Correr el pubsub fake

```
    gcloud beta emulators pubsub start --project=my-local-project --host-port=localhost:8085

```

4- Correr el proyecto

```
    npm run dev

```

5- Enviar un mensaje al topico

```
    gcloud pubsub topics publish my-topic --message "Hello World!"

```