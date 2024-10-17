import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function AnimatedSpinner({ className }: { className?: string }) {
  return <Loader2 className={cn(className, "animate-spin")} />;
}
