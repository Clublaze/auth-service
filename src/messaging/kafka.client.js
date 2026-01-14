import { Kafka } from "kafkajs";
import env from "../config/env.js";

const brokers = env.kafka?.brokers || [];

if (brokers.length === 0) {
  console.warn("KAFKA_BROKERS not set. Kafka is disabled.");
}

const kafka = new Kafka({
  clientId: env.kafka?.clientId || "unihub-auth-service",
  brokers,
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
});

const producer = kafka.producer();

export const connectKafkaProducer = async () => {
  if (brokers.length === 0) {
    return;
  }

  try {
    await producer.connect();
    console.log("Kafka producer connected");
  } catch (error) {
    console.error("Kafka producer connection failed", error.message);
  }
};

export const disconnectKafkaProducer = async () => {
  if (brokers.length === 0) return;

  try {
    await producer.disconnect();
    console.log("Kafka producer disconnected");
  } catch (error) {
    console.error("Kafka producer disconnect failed", error.message);
  }
};

export { kafka, producer };
