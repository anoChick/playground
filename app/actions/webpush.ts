"use server";
import webpush from "web-push";

export async function push(data: any) {
  const subscription = JSON.parse(data)?.subscription;

  const options = {
    vapidDetails: {
      subject: `mailto:${process.env.ADMIN_EMAIL}`,
      publicKey: `${process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY}`,
      privateKey: `${process.env.VAPID_PRIVATE_KEY}`,
    },
  };

  webpush.sendNotification(
    subscription,
    JSON.stringify({ title: "通知しました." }),
    options
  );

  return true;
}
