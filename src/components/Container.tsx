import { cn } from "@heroui/react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className = "" }: ContainerProps) => (
  <div className={cn("max-w-5xl mx-auto w-full px-4 md:px-6", className)}>
    {children}
  </div>
);
