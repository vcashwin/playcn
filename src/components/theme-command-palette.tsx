"use client";

import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { defaultPresets, ThemePreset } from "@/lib/theme-presets";
import { ExternalLinkIcon, Palette, Plus } from "lucide-react";
import { useSandpack } from "@codesandbox/sandpack-react";
import { useTheme } from "next-themes";

function convertThemeToVariables(theme: ThemePreset) {
  const cssVariables = `:root {
    ${Object.entries(theme.styles.light)
      .map(([key, value]) => `--${key}: ${value};`)
      .join("\n")}
  }
  .dark, [data-theme='dark'] {
    ${Object.entries(theme.styles.dark)
      .map(([key, value]) => `--${key}: ${value};`)
      .join("\n")}
  }`;
  return cssVariables;
}

function ColorPalette({ colors, id }: { colors: string[]; id: string }) {
  return (
    <div className="flex flex-wrap gap-0.5">
      {colors.map((color, index) => (
        <div
          key={`${id}-${color}-${index}`}
          className="border-muted h-3 w-3 rounded-sm border"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

export function ThemeCommandPalette() {
  const [open, setOpen] = useState(false);
  const { sandpack } = useSandpack();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const themes = Object.entries(defaultPresets).map(([key, value]) => ({
    id: key,
    label: value.label,
  }));

  const handleThemeSelect = (themeId: string) => {
    sandpack.updateFile(
      "theme.css",
      convertThemeToVariables(defaultPresets[themeId])
    );
    setOpen(false);
  };

  const handleCreateCustomTheme = () => {
    window.open(
      "https://tweakcn.com/editor/theme",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Theme Selector"
      description="Choose a theme or create a custom one"
    >
      <CommandInput placeholder="Search themes..." />
      <CommandList>
        <CommandEmpty>No themes found.</CommandEmpty>
        <CommandGroup>
          <CommandItem onSelect={handleCreateCustomTheme}>
            <span className="font-medium">
              Create custom theme @tweakcn.com
            </span>
            <CommandShortcut>
              <ExternalLinkIcon />
            </CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Available Themes">
          {themes.map((theme) => (
            <CommandItem
              key={theme.id}
              value={theme.id}
              onSelect={() => handleThemeSelect(theme.id)}
            >
              <ColorPalette
                id={theme.id}
                colors={
                  resolvedTheme === "dark"
                    ? [
                        defaultPresets[theme.id].styles.dark.primary,
                        defaultPresets[theme.id].styles.dark.secondary,
                        defaultPresets[theme.id].styles.dark.accent,
                      ]
                    : [
                        defaultPresets[theme.id].styles.light.primary,
                        defaultPresets[theme.id].styles.light.secondary,
                        defaultPresets[theme.id].styles.light.accent,
                      ]
                }
              />
              <span>{theme.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
