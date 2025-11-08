"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export type Component = {
  name: string;
  fileName: string;
};

type ComponentSidebarProps = {
  components: Component[];
  selectedComponent: string | null;
  onSelectComponent: (componentName: string) => void;
};

export function ComponentSidebar({
  components,
  selectedComponent,
  onSelectComponent,
}: ComponentSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredComponents = components.filter((component) =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="p-4">
        <h2 className="mb-2 text-lg font-semibold">Components</h2>
        <p className="text-sm text-muted-foreground">
          Browse and preview UI components
        </p>
      </div>
      <Separator />
      <div className="p-4">
        <Input
          placeholder="Search components..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-9"
        />
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {filteredComponents.map((component) => (
            <button
              key={component.fileName}
              onClick={() => onSelectComponent(component.fileName)}
              className={cn(
                "w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                selectedComponent === component.fileName &&
                  "bg-accent text-accent-foreground"
              )}
            >
              {component.name}
            </button>
          ))}
        </div>
      </ScrollArea>
      <Separator />
      <div className="p-4">
        <p className="text-xs text-muted-foreground">
          {filteredComponents.length} component{filteredComponents.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}

