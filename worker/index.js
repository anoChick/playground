"use strict";
// TODO: ts化

self.addEventListener("push", (event) => {
  const data = event.data.json();
  const title = data.title;
  const options = {
    body: data.body,
    icon: "https://pg.anochick.com/icon512.png",
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
