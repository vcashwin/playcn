"use client";

import { useEffect, useMemo } from "react";
import { ComponentSidebar } from "@/components/component-sidebar";
import { ComponentViewer } from "@/components/component-viewer";
import { useComponents } from "@/hooks/use-components";
import { useActiveComponent } from "@/stores/use-active-component";

export default function Home() {
  const { data: allComponents = [], isLoading } = useComponents();
  const { activeComponentName, setActiveComponentName } = useActiveComponent();

  useEffect(() => {
    if (allComponents.length > 0 && !activeComponentName) {
      setActiveComponentName(allComponents[0].fileName);
    }
  }, [allComponents, activeComponentName, setActiveComponentName]);

  if (isLoading || allComponents.length === 0 || !activeComponentName) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Loading Components...</h2>
          <p className="text-muted-foreground">
            Please wait while we load the component library.
          </p>
        </div>
      </div>
    );
  }

  return (
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
  );
}
