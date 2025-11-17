"use client";

import { useEffect, useState } from "react";
import { ComponentSidebar } from "@/components/component-sidebar";
import { ComponentViewer } from "@/components/component-viewer";
import { useComponents } from "@/hooks/use-components";
import { useActiveComponent } from "@/stores/use-active-component";
import { SplashScreen } from "@/components/splash-screen";

export default function App() {
  const { data: allComponents = [], isLoading } = useComponents();
  const { activeComponentName, setActiveComponentName } = useActiveComponent();
  const [splashScreenStatus, setSplashScreenStatus] = useState<
    "loading" | "loaded" | "hidden"
  >("loading");

  useEffect(() => {
    if (allComponents.length > 0 && !activeComponentName) {
      setActiveComponentName(allComponents[0].fileName);
      setSplashScreenStatus("loaded");
      setTimeout(() => {
        setSplashScreenStatus("hidden");
      }, 3000);
    }
  }, [allComponents, activeComponentName, setActiveComponentName]);

  return (
    <>
      {splashScreenStatus !== "hidden" && <SplashScreen />}

      {splashScreenStatus !== "loading" && (
        <div className="flex h-screen overflow-hidden">
          <ComponentSidebar
            components={allComponents}
            selectedComponent={activeComponentName}
            onSelectComponent={setActiveComponentName}
          />
          <div className="flex-1 overflow-hidden">
            <ComponentViewer />
          </div>
        </div>
      )}
    </>
  );
}
