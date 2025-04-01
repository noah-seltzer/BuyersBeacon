import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

/**
 * A consistent container component for page layouts
 * Reduces repeated container/padding classes throughout the app
 */
const PageContainer = ({ 
  children, 
  className, 
  fullWidth = false 
}: PageContainerProps) => {
  return (
    <div className={cn(
      "mx-auto px-4 py-8",
      fullWidth ? "w-full" : "max-w-7xl",
      className
    )}>
      {children}
    </div>
  );
};

export default PageContainer;