import * as React from "react"
import { cn } from "@/lib/utils"

type SectionContainerProps = React.HTMLAttributes<HTMLDivElement>

export function SectionContainer({ className, ...props }: SectionContainerProps) {
  return <div className={cn("mx-auto w-full max-w-[78rem] px-5 sm:px-8 lg:px-10", className)} {...props} />
}
