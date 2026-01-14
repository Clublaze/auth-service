import { producer } from "../kafka.client.js";

const USER_EVENTS_TOPIC = "user-events";

const sendEvent = async ({ key, event, payload }) => {
  await producer.send({
    topic: USER_EVENTS_TOPIC,
    messages: [
      {
        key,
        value: JSON.stringify({
          event,
          payload,
          timestamp: new Date().toISOString(),
        }),
      },
    ],
  });
};

export const publishUserRegistered = async ({
  userId,
  email,
  userType,
  universityId,
}) => {
  await sendEvent({
    key: userId,
    event: "user.registered",
    payload: {
      userId,
      email,
      userType,
      universityId,
    },
  });
};

export const publishUserLoggedIn = async ({
  userId,
  userType,
  universityId,
}) => {
  await sendEvent({
    key: userId,
    event: "user.logged_in",
    payload: {
      userId,
      userType,
      universityId,
    },
  });
};
