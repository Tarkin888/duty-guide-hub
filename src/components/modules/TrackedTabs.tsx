import * as React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTabViewTracking } from "@/hooks/useTabViewTracking";

interface TrackedTabsContextValue {
  moduleId: string;
  markTabViewed: (tabValue: string) => void;
  isTabViewed: (tabValue: string) => boolean;
  activeTab: string | undefined;
}

const TrackedTabsContext = createContext<TrackedTabsContextValue | null>(null);

export function useTrackedTabs() {
  const context = useContext(TrackedTabsContext);
  if (!context) {
    throw new Error("useTrackedTabs must be used within TrackedTabs");
  }
  return context;
}

interface TrackedTabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  moduleId: string;
  children: React.ReactNode;
}

export function TrackedTabs({ moduleId, children, defaultValue, onValueChange, ...props }: TrackedTabsProps) {
  const { markTabViewed, isTabViewed } = useTabViewTracking(moduleId);
  const [activeTab, setActiveTab] = useState<string | undefined>(defaultValue);

  // Mark default tab as viewed on mount
  useEffect(() => {
    if (defaultValue) {
      markTabViewed(defaultValue);
    }
  }, [defaultValue, markTabViewed]);

  const handleValueChange = (value: string) => {
    setActiveTab(value);
    markTabViewed(value);
    onValueChange?.(value);
  };

  return (
    <TrackedTabsContext.Provider value={{ moduleId, markTabViewed, isTabViewed, activeTab }}>
      <TabsPrimitive.Root
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        {...props}
      >
        {children}
      </TabsPrimitive.Root>
    </TrackedTabsContext.Provider>
  );
}

export const TrackedTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TrackedTabsList.displayName = "TrackedTabsList";

interface TrackedTabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  value: string;
}

export const TrackedTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TrackedTabsTriggerProps
>(({ className, children, value, ...props }, ref) => {
  const context = useContext(TrackedTabsContext);
  const viewed = context?.isTabViewed(value) ?? false;
  const isActive = context?.activeTab === value;

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      value={value}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all",
        "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "gap-1.5",
        className,
      )}
      {...props}
    >
      {children}
      {viewed && !isActive && (
        <Check className="h-3 w-3 text-success shrink-0" aria-label="Viewed" />
      )}
    </TabsPrimitive.Trigger>
  );
});
TrackedTabsTrigger.displayName = "TrackedTabsTrigger";

export const TrackedTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TrackedTabsContent.displayName = "TrackedTabsContent";
