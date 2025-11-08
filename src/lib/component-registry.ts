import { readFileSync } from "fs";
import { join } from "path";

export type ComponentInfo = {
  name: string;
  fileName: string;
  displayName: string;
  dependencies: Record<string, string>;
  code: string;
  exampleCode: string;
};

// Define dependencies for each component based on their imports
export const componentDependencies: Record<string, Record<string, string>> = {
  accordion: {
    "@radix-ui/react-accordion": "^1.2.12",
    "lucide-react": "^0.553.0",
  },
  "alert-dialog": {
    "@radix-ui/react-alert-dialog": "^1.1.15",
  },
  alert: {},
  "aspect-ratio": {
    "@radix-ui/react-aspect-ratio": "^1.1.8",
  },
  avatar: {
    "@radix-ui/react-avatar": "^1.1.11",
  },
  badge: {
    "class-variance-authority": "^0.7.1",
    "@radix-ui/react-slot": "^1.2.4",
  },
  breadcrumb: {
    "lucide-react": "^0.553.0",
    "@radix-ui/react-slot": "^1.2.4",
  },
  "button-group": {},
  button: {
    "@radix-ui/react-slot": "^1.2.4",
    "class-variance-authority": "^0.7.1",
  },
  calendar: {
    "react-day-picker": "^9.11.1",
    "lucide-react": "^0.553.0",
  },
  card: {},
  carousel: {
    "embla-carousel-react": "^8.6.0",
    "lucide-react": "^0.553.0",
  },
  chart: {
    recharts: "2.15.4",
    "lucide-react": "^0.553.0",
  },
  checkbox: {
    "@radix-ui/react-checkbox": "^1.3.3",
    "lucide-react": "^0.553.0",
  },
  collapsible: {
    "@radix-ui/react-collapsible": "^1.1.12",
  },
  command: {
    cmdk: "^1.1.1",
    "lucide-react": "^0.553.0",
    "@radix-ui/react-dialog": "^1.1.15",
  },
  "context-menu": {
    "@radix-ui/react-context-menu": "^2.2.16",
    "lucide-react": "^0.553.0",
  },
  dialog: {
    "@radix-ui/react-dialog": "^1.1.15",
    "lucide-react": "^0.553.0",
  },
  drawer: {
    vaul: "^1.1.2",
  },
  "dropdown-menu": {
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "lucide-react": "^0.553.0",
  },
  empty: {
    "lucide-react": "^0.553.0",
  },
  field: {},
  form: {
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "react-hook-form": "^7.66.0",
  },
  "hover-card": {
    "@radix-ui/react-hover-card": "^1.1.15",
  },
  "input-group": {},
  "input-otp": {
    "input-otp": "^1.4.2",
  },
  input: {},
  item: {},
  kbd: {},
  label: {
    "@radix-ui/react-label": "^2.1.8",
    "class-variance-authority": "^0.7.1",
  },
  menubar: {
    "@radix-ui/react-menubar": "^1.1.16",
    "lucide-react": "^0.553.0",
  },
  "navigation-menu": {
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "lucide-react": "^0.553.0",
  },
  pagination: {
    "lucide-react": "^0.553.0",
  },
  popover: {
    "@radix-ui/react-popover": "^1.1.15",
  },
  progress: {
    "@radix-ui/react-progress": "^1.1.8",
  },
  "radio-group": {
    "@radix-ui/react-radio-group": "^1.3.8",
    "lucide-react": "^0.553.0",
  },
  resizable: {
    "react-resizable-panels": "^3.0.6",
  },
  "scroll-area": {
    "@radix-ui/react-scroll-area": "^1.2.10",
  },
  select: {
    "@radix-ui/react-select": "^2.2.6",
    "lucide-react": "^0.553.0",
  },
  separator: {
    "@radix-ui/react-separator": "^1.1.8",
  },
  sheet: {
    "@radix-ui/react-dialog": "^1.1.15",
    "lucide-react": "^0.553.0",
    "class-variance-authority": "^0.7.1",
  },
  sidebar: {
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "lucide-react": "^0.553.0",
    "class-variance-authority": "^0.7.1",
  },
  skeleton: {},
  slider: {
    "@radix-ui/react-slider": "^1.3.6",
  },
  sonner: {
    sonner: "^2.0.7",
    "next-themes": "^0.4.6",
  },
  spinner: {},
  switch: {
    "@radix-ui/react-switch": "^1.2.6",
  },
  table: {},
  tabs: {
    "@radix-ui/react-tabs": "^1.1.13",
  },
  textarea: {},
  "toggle-group": {
    "@radix-ui/react-toggle-group": "^1.1.11",
    "class-variance-authority": "^0.7.1",
  },
  toggle: {
    "@radix-ui/react-toggle": "^1.1.10",
    "class-variance-authority": "^0.7.1",
  },
  tooltip: {
    "@radix-ui/react-tooltip": "^1.2.8",
  },
};

// Example code for each component
export const componentExamples: Record<string, string> = {
  button: `import { Button } from "./button";

export default function ButtonDemo() {
  return (
    <div className="flex gap-4 p-4">
      <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}`,
  card: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card";

export default function CardDemo() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter className="gap-2">
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90">
          Action
        </button>
      </CardFooter>
    </Card>
  );
}`,
  badge: `import { Badge } from "./badge";

export default function BadgeDemo() {
  return (
    <div className="flex gap-2 p-4">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}`,
  accordion: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";

export default function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components aesthetic.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
  checkbox: `import { Checkbox } from "./checkbox";

export default function CheckboxDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  );
}`,
  input: `import { Input } from "./input";

export default function InputDemo() {
  return <Input type="email" placeholder="Email" />;
}`,
  label: `import { Label } from "./label";

export default function LabelDemo() {
  return (
    <div>
      <Label htmlFor="email">Your email address</Label>
    </div>
  );
}`,
  select: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  );
}`,
  switch: `import { Switch } from "./switch";

export default function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode">Airplane Mode</label>
    </div>
  );
}`,
  textarea: `import { Textarea } from "./textarea";

export default function TextareaDemo() {
  return <Textarea placeholder="Type your message here." />;
}`,
  slider: `import { Slider } from "./slider";

export default function SliderDemo() {
  return <Slider defaultValue={[50]} max={100} step={1} />;
}`,
  progress: `import { Progress } from "./progress";

export default function ProgressDemo() {
  return <Progress value={33} />;
}`,
  tabs: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">
        Change your password here.
      </TabsContent>
    </Tabs>
  );
}`,
  tooltip: `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

export default function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground">
            Hover
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}`,
  alert: `import { Alert, AlertDescription, AlertTitle } from "./alert";

export default function AlertDemo() {
  return (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  );
}`,
  skeleton: `import { Skeleton } from "./skeleton";

export default function SkeletonDemo() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}`,
  spinner: `import { Spinner } from "./spinner";

export default function SpinnerDemo() {
  return <Spinner />;
}`,
  separator: `import { Separator } from "./separator";

export default function SeparatorDemo() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  );
}`,
};

// Generate a generic example for components without specific examples
export function getDefaultExample(componentName: string): string {
  const componentTitle = componentName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  return `import { ${componentTitle} } from "./${componentName}";

export default function ${componentTitle}Demo() {
  return (
    <div className="p-4">
      <${componentTitle} />
    </div>
  );
}`;
}

export function getComponentExample(componentName: string): string {
  return componentExamples[componentName] || getDefaultExample(componentName);
}

export function getComponentDependencies(
  componentName: string
): Record<string, string> {
  return {
    react: "^19.2.0",
    "react-dom": "^19.2.0",
    clsx: "^2.1.1",
    "tailwind-merge": "^3.3.1",
    "class-variance-authority": "^0.7.1",
    ...componentDependencies[componentName],
  };
}
