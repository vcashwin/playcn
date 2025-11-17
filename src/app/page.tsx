"use client";

import App from "@/components/app";
import { SplashScreen } from "@/components/splash-screen";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <SplashScreen isMobile={true} />;
  }

  return <App />;
}
