"use client";

import { useState, useEffect } from "react";
import { ComponentSidebar } from "@/components/component-sidebar";
import { ComponentViewer } from "@/components/component-viewer";
import {
  getComponentExample,
  getComponentDependencies,
} from "@/lib/component-registry";

type Component = {
  name: string;
  fileName: string;
};

export default function Home() {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  const [componentCode, setComponentCode] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Load the list of components
  useEffect(() => {
    async function loadComponents() {
      try {
        const response = await fetch("/api/components");
        const data = await response.json();
        setComponents(data.components);
        if (data.components.length > 0) {
          setSelectedComponent(data.components[0].fileName);
        }
      } catch (error) {
        console.error("Failed to load components:", error);
      }
    }
    loadComponents();
  }, []);

  // Load selected component code
  useEffect(() => {
    if (!selectedComponent) return;

    async function loadComponentCode() {
      setLoading(true);
      try {
        const response = await fetch(`/api/components/${selectedComponent}`);
        const data = await response.json();
        setComponentCode(data.code);
      } catch (error) {
        console.error("Failed to load component code:", error);
      } finally {
        setLoading(false);
      }
    }
    loadComponentCode();
  }, [selectedComponent]);

  if (components.length === 0) {
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
        components={components}
        selectedComponent={selectedComponent}
        onSelectComponent={setSelectedComponent}
      />
      <div className="flex-1 overflow-hidden">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">Loading component...</p>
          </div>
        ) : selectedComponent && componentCode ? (
          <ComponentViewer
            componentName={selectedComponent.replace(".tsx", "")}
            componentCode={componentCode}
            exampleCode={getComponentExample(
              selectedComponent.replace(".tsx", "")
            )}
            dependencies={getComponentDependencies(
              selectedComponent.replace(".tsx", "")
            )}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">
              Select a component to preview
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
