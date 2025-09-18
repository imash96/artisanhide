"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BreadcrumbItem } from "@/type/common";
import type { Route } from "next";
import { cn } from "@lib/utils";

type BreadcrumbProps = {
  crumbs: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumb({ crumbs, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn("w-full overflow-x-auto whitespace-nowrap", className)}
    >
      <ol className="flex items-center text-sm text-muted-foreground">
        {crumbs.map((item, idx) => {
          const isLast = idx === crumbs.length - 1;

          return (
            <li
              key={item.href}
              className="flex items-center"
              aria-current={isLast ? "page" : undefined}
            >
              {!isLast ? (
                <Link
                  href={item.href as Route}
                  className="hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="font-medium text-foreground">{item.name}</span>
              )}
              {!isLast && (
                <ChevronRight
                  className="mx-2 h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
