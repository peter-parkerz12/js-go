import { WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(typeof navigator !== "undefined" ? !navigator.onLine : false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline) return null;

//   return (
//     // <div className="sticky top-14 z-40 border-b-2 border-border bg-background/95 px-4 py-3 text-sm text-muted-foreground backdrop-blur lg:top-16">
//     //   <div className="mx-auto flex max-w-[1400px] items-center gap-3 text-left">
//     //     <WifiOff className="h-4 w-4" />
//     //     <div>
//     //       <p className="font-semibold text-foreground">Offline mode enabled</p>
//     //       <p className="text-xs">Cached lessons are available. Some external resources may be limited.</p>
//     //     </div>
//     //   </div>
//     // </div>
//   );
}
