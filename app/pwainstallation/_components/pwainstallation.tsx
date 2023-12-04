"use client";

import { useEffect, useRef, useState } from "react";

export const PWAInstallation = () => {
  const deferredPromptRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [installedApps, setInstalledApps] = useState([]);

  const [installedByRelatedApps, setInstalledByRelatedApps] = useState(false);
  const [
    installCompletedByAppInstalledEvent,
    setInstallCompletedByAppInstalledEvent,
  ] = useState(false);

  const checkIsInstalled = async () => {
    const nav = navigator as any;
    if ("getInstalledRelatedApps" in nav) {
      const apps = await nav.getInstalledRelatedApps();
      console.log(apps);
      setInstalledApps(apps);
      setInstalledByRelatedApps(apps.length !== 0);
    }
  };

  useEffect(() => {
    checkIsInstalled();
    const beforeInstallPromptHandler = (event: any) => {
      setReady(true);
      deferredPromptRef.current = event;
    };
    const appInstalledHandler = (event: any) => {
      setInstallCompletedByAppInstalledEvent(true);
    };

    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);
    window.addEventListener("appinstalled", appInstalledHandler);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstallPromptHandler
      );
      window.removeEventListener("appinstalled", appInstalledHandler);
    };
  }, []);

  const handleClickInstall = async () => {
    const deferredPrompt = deferredPromptRef.current;
    if (deferredPrompt) {
      deferredPrompt.prompt();
    }
  };

  return (
    <div className="">
      <h1>PWA Installation</h1>
      <div>
        navigator.installedByRelatedAppsによる判定:　
        {installedByRelatedApps ? "インストール済" : "未インストール"}
      </div>{" "}
      <div>
        appinstalledイベントによる判定:　
        {installCompletedByAppInstalledEvent
          ? "インストール済"
          : "未インストール"}
      </div>
      installedByRelatedApps:
      <div className="border p-2">{JSON.stringify(installedApps)}</div>
      <button
        className={`p-2 m-2  text-white rounded ${
          ready ? "bg-blue-400" : "bg-gray-300"
        }`}
        disabled={!ready}
        onClick={handleClickInstall}
      >
        Install
      </button>
      <button
        className={`p-2 m-2  text-white rounded bg-blue-400`}
        onClick={() => {
          location.reload();
        }}
      >
        Reload Page
      </button>
    </div>
  );
};
