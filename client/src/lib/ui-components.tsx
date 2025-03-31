import { ReactNode } from "react";
import { cn } from "./utils";
import { MapPin, DollarSign, User2, Search, ArrowLeft } from "lucide-react";

/**
 * Common UI component library to reduce repetitive Tailwind classes
 * These components serve as building blocks for larger components
 */

// Icon wrappers
export const IconWrapper = ({ 
  children, 
  size = "md", 
  color = "primary",
  className 
}: { 
  children: ReactNode; 
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "muted";
  className?: string;
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };
  
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    muted: "bg-muted text-muted-foreground"
  };
  
  return (
    <div className={cn(
      "rounded-full flex items-center justify-center",
      sizeClasses[size],
      colorClasses[color],
      className
    )}>
      {children}
    </div>
  );
};

// Badges
export const Badge = ({
  children,
  variant = "primary",
  className
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}) => {
  const variantClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    outline: "border border-border text-foreground/70"
  };
  
  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-sm inline-flex items-center",
      variantClasses[variant],
      className
    )}>
      {children}
    </span>
  );
};

// Common Icon Components with consistent styling
export const LocationIcon = ({ className }: { className?: string }) => (
  <MapPin className={cn("h-5 w-5 text-muted-foreground", className)} />
);

export const PriceIcon = ({ className }: { className?: string }) => (
  <DollarSign className={cn("h-6 w-6 text-primary", className)} />
);

export const UserIcon = ({ className }: { className?: string }) => (
  <User2 className={cn("h-5 w-5 text-muted-foreground", className)} />
);

export const SearchIcon = ({ className }: { className?: string }) => (
  <Search className={cn("h-5 w-5 text-muted-foreground", className)} />
);

export const BackIcon = ({ className }: { className?: string }) => (
  <ArrowLeft className={cn("h-5 w-5", className)} />
);

// Section titles with consistent styling
export const SectionTitle = ({
  children,
  className,
  subtitle
}: {
  children: ReactNode;
  className?: string;
  subtitle?: string;
}) => (
  <div className={cn("mb-8 text-center", className)}>
    <h2 className="text-3xl md:text-4xl font-bold mb-4">{children}</h2>
    {subtitle && (
      <p className="text-foreground/70 text-lg max-w-2xl mx-auto">{subtitle}</p>
    )}
  </div>
);

// Empty state component
export const EmptyState = ({
  icon,
  title,
  description,
  action
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) => (
  <div className="text-center py-12 bg-accent/10 rounded-xl border border-border/40">
    <div className="flex-center mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground max-w-md mx-auto mb-6">
      {description}
    </p>
    {action}
  </div>
);