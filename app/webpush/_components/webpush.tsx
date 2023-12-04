"use client";
import { useEffect, useState } from "react";

import { push } from "@/app/actions/webpush";

const base64ToUint8Array = (base64: string) => {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(b64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const WebPush = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      (window as any).workbox !== undefined
    ) {
      // run only in browser
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          if (
            sub &&
            !(
              sub.expirationTime &&
              Date.now() > sub.expirationTime - 5 * 60 * 1000
            )
          ) {
            setSubscription(sub);
            setIsSubscribed(true);
          }
        });
        setRegistration(reg);
      });
    }
  }, []);

  const subscribeButtonOnClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!registration) return;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(
        `${process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY}`
      ),
    });
    setSubscription(sub);
    setIsSubscribed(true);
  };

  const unsubscribeButtonOnClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!subscription) return;

    await subscription.unsubscribe();
    // TODO: you should call your API to delete or invalidate subscription data on server
    setSubscription(null);
    setIsSubscribed(false);
    console.log("web push unsubscribed!");
  };

  const sendNotificationButtonOnClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!subscription) return;
    await push(
      JSON.stringify({
        subscription,
        type: "basic",
      })
    );
  };
  const sendActionNotificationButtonOnClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!subscription) return;
    await push(
      JSON.stringify({
        subscription,
        type: "action",
      })
    );
  };
  const sendReplyNotificationButtonOnClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!subscription) return;
    await push(
      JSON.stringify({
        subscription,
        type: "reply",
      })
    );
  };
  return (
    <div className="">
      <h1>web push</h1>
      <button
        className={`p-2 m-2  text-white rounded ${
          isSubscribed ? "bg-gray-300" : "bg-blue-400"
        }`}
        onClick={subscribeButtonOnClick}
        disabled={isSubscribed}
      >
        Subscribe
      </button>
      <button
        className={`p-2 m-2  text-white rounded ${
          !isSubscribed ? "bg-gray-300" : "bg-blue-400"
        }`}
        onClick={unsubscribeButtonOnClick}
        disabled={!isSubscribed}
      >
        Unsubscribe
      </button>
      <button
        className={`p-2 m-2  text-white rounded ${
          !isSubscribed ? "bg-gray-300" : "bg-blue-400"
        }`}
        onClick={sendNotificationButtonOnClick}
        disabled={!isSubscribed}
      >
        Send Notification
      </button>{" "}
      <button
        className={`p-2 m-2  text-white rounded ${
          !isSubscribed ? "bg-gray-300" : "bg-blue-400"
        }`}
        onClick={sendActionNotificationButtonOnClick}
        disabled={!isSubscribed}
      >
        Send Action Notification
      </button>
      <button
        className={`p-2 m-2  text-white rounded ${
          !isSubscribed ? "bg-gray-300" : "bg-blue-400"
        }`}
        onClick={sendReplyNotificationButtonOnClick}
        disabled={!isSubscribed}
      >
        Send Reply Notification
      </button>
    </div>
  );
};
