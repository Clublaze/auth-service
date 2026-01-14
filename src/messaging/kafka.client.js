import { Kafka } from "kafkajs";

const brokers = process.env.KAFKA_BROKERS
  ? process.env.KAFKA_BROKERS.split(",")
  : [];

if (brokers.length === 0) {
  console.warn("KAFKA_BROKERS not set. Kafka will not connect.");
}

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || "unihub-auth-service",
  brokers,
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
});

const producer = kafka.producer();

export const connectKafkaProducer = async () => {
  try {
    await producer.connect();
    console.log("Kafka producer connected");
  } catch (error) {
    console.error("Kafka producer connection failed", error);
    throw error;
  }
};

export const disconnectKafkaProducer = async () => {
  try {
    await producer.disconnect();
    console.log("Kafka producer disconnected");
  } catch (error) {
    console.error("Kafka producer disconnect failed", error);
  }
};

export { kafka, producer };
