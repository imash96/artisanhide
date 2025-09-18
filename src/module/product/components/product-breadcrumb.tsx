import Link from "next/link";
import type { Route } from "next";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@module/ui/breadcrumb";
import { BreadcrumbItem as Crumb } from "@/type/common";

type BreadcrumbProps = {
  crumbs: Crumb[];
  className?: string;
};

export default function BreadcrumbComp({
  crumbs,
  className = "",
}: BreadcrumbProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {crumbs.map((item, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <BreadcrumbItem key={item.href}>
              {isLast ? (
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink href={item.href as Route}>
                    {item.name}
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
