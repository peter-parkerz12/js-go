<<<<<<< HEAD
import { useEffect, useState, useCallback } from "react";
import { Workbox } from "workbox-window";

export function useSWUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [isOffline, setIsOffline] = useState(typeof navigator !== "undefined" ? !navigator.onLine : false);

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    const wb = new Workbox("/sw.js");

    wb.addEventListener("waiting", (event) => {
      setWaitingWorker(event.sw ?? null);
      setUpdateAvailable(true);
    });

    wb.addEventListener("activated", (event) => {
      if (event.isUpdate) {
        window.location.reload();
      }
    });

    wb.register().catch(console.error);

    const onOnline = () => setIsOffline(false);
    const onOffline = () => setIsOffline(true);

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  const activateUpdate = useCallback(() => {
    if (!waitingWorker) return;
    waitingWorker.postMessage({ type: "SKIP_WAITING" });
  }, [waitingWorker]);

  return { updateAvailable, activateUpdate, isOffline } as const;
}
=======
import { useEffect, useState, useCallback } from "react";
import { Workbox } from "workbox-window";

export function useSWUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== "undefined" ? !navigator.onLine : false,
  );

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    const wb = new Workbox("/sw.js");

    wb.addEventListener("waiting", (event) => {
      setWaitingWorker(event.sw);
      setUpdateAvailable(true);
    });

    wb.addEventListener("activated", (event) => {
      if (event.isUpdate) {
        window.location.reload();
      }
    });

    wb.register().catch(console.error);

    const onOnline = () => setIsOffline(false);
    const onOffline = () => setIsOffline(true);

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  const activateUpdate = useCallback(() => {
    if (!waitingWorker) return;
    waitingWorker.postMessage({ type: "SKIP_WAITING" });
  }, [waitingWorker]);

  return { updateAvailable, activateUpdate, isOffline } as const;
}
>>>>>>> fd8bc72495f2244aff2974795fe3ecec7fd909df
