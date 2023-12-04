"use strict";
// TODO: ts化

self.addEventListener("push", (event) => {
  const data = event.data.json();
  const title = data.title;
  const type = data.type;

  const actions = [];
  if (type === "reply") {
    actions.push({
      action: "reply",
      type: "text",
      title: "Reply",
      icon: "https://pg.anochick.com/icons/reply.png",
      placeholder: "返信メッセージを入力してください",
    });
  }
  if (type === "action") {
    actions.push({
      action: "like",
      type: "button",
      title: "いいね",
    });
  }

  const options = {
    body: `type:${type}; ${data.body}`,
    icon: "https://pg.anochick.com/icon512.png",
    badge:
      type === "action" ? "https://pg.anochick.com/icons/heart.png" : undefined,

    actions: actions,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
