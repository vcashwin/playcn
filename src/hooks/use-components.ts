import { useQuery } from "@tanstack/react-query";

export type ComponentData = {
  name: string;
  fileName: string;
  files: Record<string, string>;
  exampleCode: string;
};

type AllComponentsResponse = {
  components: ComponentData[];
};

/**
 * Hook to fetch all components data at once (list + files for all components)
 * Returns the complete dataset with all component information
 */
export function useComponents() {
  return useQuery({
    queryKey: ["all-components"],
    queryFn: async (): Promise<ComponentData[]> => {
      const response = await fetch("/api/components/all");
      if (!response.ok) {
        throw new Error("Failed to fetch components");
      }
      const data: AllComponentsResponse = await response.json();
      return data.components;
    },
  });
}
