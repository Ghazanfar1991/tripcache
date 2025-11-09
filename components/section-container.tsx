import * as React from "react"
import { cn } from "@/lib/utils"

type SectionContainerProps = React.HTMLAttributes<HTMLDivElement>

export function SectionContainer({ className, ...props }: SectionContainerProps) {
  return <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", className)} {...props} />
}

