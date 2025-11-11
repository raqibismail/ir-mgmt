import { type VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "./ui/button";

export default function AppButton({
  variant,
  children,
  className,
  ...props // ✅ capture onClick and other button props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
  }) {
  return (
    <Button
      variant={variant}
      className={`border border-white/20 bg-white/5 text-slate-200 hover:bg-white/10 transition-all ${className}`}
      {...props} // ✅ forward onClick and others to Button
    >
      {children}
    </Button>
  );
}
