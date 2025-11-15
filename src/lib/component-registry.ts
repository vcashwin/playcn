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
  button: `import { Button } from "./button"

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}`,
  card: `import { Button } from "./button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import { Input } from "./input"
import { Label } from "./label"

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create account</Button>
      </CardFooter>
    </Card>
  )
}`,
  badge: `import { BadgeCheckIcon } from "lucide-react"

import { Badge } from "./badge"

export default function BadgeDemo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full flex-wrap gap-2">
        <Badge>Badge</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
      <div className="flex w-full flex-wrap gap-2">
        <Badge
          variant="secondary"
          className="bg-blue-500 text-white dark:bg-blue-600"
        >
          <BadgeCheckIcon />
          Verified
        </Badge>
        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
          8
        </Badge>
        <Badge
          className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
          variant="destructive"
        >
          99
        </Badge>
        <Badge
          className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
          variant="outline"
        >
          20+
        </Badge>
      </div>
    </div>
  )
}`,
  accordion: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion"

export default function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Product Information</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Our flagship product combines cutting-edge technology with sleek
            design. Built with premium materials, it offers unparalleled
            performance and reliability.
          </p>
          <p>
            Key features include advanced processing capabilities, and an
            intuitive user interface designed for both beginners and experts.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Shipping Details</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            We offer worldwide shipping through trusted courier partners.
            Standard delivery takes 3-5 business days, while express shipping
            ensures delivery within 1-2 business days.
          </p>
          <p>
            All orders are carefully packaged and fully insured. Track your
            shipment in real-time through our dedicated tracking portal.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Return Policy</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            We stand behind our products with a comprehensive 30-day return
            policy. If you're not completely satisfied, simply return the
            item in its original condition.
          </p>
          <p>
            Our hassle-free return process includes free return shipping and
            full refunds processed within 48 hours of receiving the returned
            item.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
  checkbox: `import { Checkbox } from "./checkbox"

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
  )
}`,
  input: `import { Input } from "./input"

export default function InputDemo() {
  return <Input type="email" placeholder="Email" />
}`,
  label: `import { Label } from "./label"

export default function LabelDemo() {
  return (
    <div>
      <Label htmlFor="email">Your email address</Label>
    </div>
  )
}`,
  select: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  )
}`,
  switch: `import { Label } from "./label"
import { Switch } from "./switch"

export default function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}`,
  textarea: `import { Textarea } from "./textarea"

export default function TextareaDemo() {
  return <Textarea placeholder="Type your message here." />
}`,
  slider: `import { Slider } from "./slider"

export default function SliderDemo() {
  return <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />
}`,
  progress: `import { Progress } from "./progress"

export default function ProgressDemo() {
  return <Progress value={33} className="w-[60%]" />
}`,
  tabs: `import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./tabs"

export default function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground">
          Make changes to your account here. Click save when you're done.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-muted-foreground">
          Change your password here. After saving, you'll be logged out.
        </p>
      </TabsContent>
    </Tabs>
  )
}`,
  tooltip: `import { Button } from "./button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

export default function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`,
  alert: `import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "./alert"

export default function AlertDemo() {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Success! Your changes have been saved</AlertTitle>
        <AlertDescription>
          This is an alert with icon, title and description.
        </AlertDescription>
      </Alert>
      <Alert>
        <PopcornIcon />
        <AlertTitle>
          This Alert has a title and an icon. No description.
        </AlertTitle>
      </Alert>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to process your payment.</AlertTitle>
        <AlertDescription>
          <p>Please verify your billing information and try again.</p>
          <ul className="list-inside list-disc text-sm">
            <li>Check your card details</li>
            <li>Ensure sufficient funds</li>
            <li>Verify billing address</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  )
}`,
  skeleton: `import { Skeleton } from "./skeleton"

export default function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}`,
  spinner: `import { Spinner } from "./spinner"

export default function SpinnerDemo() {
  return <Spinner />
}`,
  separator: `import { Separator } from "./separator"

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
  )
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
  _componentName: string
): Record<string, string> {
  return {
    "@codesandbox/sandpack-react": "^2.20.0",
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-aspect-ratio": "^1.1.8",
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-collapsible": "^1.1.12",
    "@radix-ui/react-context-menu": "^2.2.16",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-hover-card": "^1.1.15",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-menubar": "^1.1.16",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.8",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slider": "^1.3.6",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-toggle": "^1.1.10",
    "@radix-ui/react-toggle-group": "^1.1.11",
    "@radix-ui/react-tooltip": "^1.2.8",
    "class-variance-authority": "^0.7.1",
    clsx: "^2.1.1",
    cmdk: "^1.1.1",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.6.0",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.553.0",
    next: "16.0.1",
    "next-themes": "^0.4.6",
    react: "19.2.0",
    "react-day-picker": "^9.11.1",
    "react-dom": "19.2.0",
    "react-hook-form": "^7.66.0",
    "react-resizable-panels": "^3.0.6",
    recharts: "2.15.4",
    sonner: "^2.0.7",
    "tailwind-merge": "^3.3.1",
    vaul: "^1.1.2",
    zod: "^4.1.12",
  };
}
