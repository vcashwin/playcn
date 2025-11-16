"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ThemeSwitcher } from "./theme-switcher";

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
    <div className="flex h-screen w-64 flex-col border-r bg-background overflow-hidden">
      <div className="p-4 pb-2">
        <div className="pb-2 flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-[0.5]">PlayCN</h2>
          <ThemeSwitcher />
        </div>
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
      <ScrollArea className="flex-1 h-full">
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
          {filteredComponents.length} component
          {filteredComponents.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
