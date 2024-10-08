"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem, SidebarNavItem } from "@/types";
import { Menu } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ProjectSwitcher from "@/components/dashboard/project-switcher";
import { UpgradeCard } from "@/components/dashboard/upgrade-card";
import { Icons } from "@/components/shared/icons";

interface DashboardSidebarProps {
  links: SidebarNavItem[];
}

export function DashboardSidebar({ links }: DashboardSidebarProps) {
  const path = usePathname();

  return (
    <div className="sticky top-0 h-full">
      <ScrollArea className="h-full overflow-y-auto border-r">
        <aside className={cn("w-[250px]", "hidden h-screen md:block")}>
          <div className="flex h-full max-h-screen flex-1 flex-col gap-2">
            <Link
              href="#"
              className="flex items-center gap-2 p-4 pb-0 text-lg font-semibold"
            >
              <Icons.logo className="size-6" />
              <span className="font-urban text-xl font-bold">
                {siteConfig.name}
              </span>
            </Link>

            <nav className="flex flex-1 flex-col gap-4 px-4 pt-4">
              {links.map((section) => (
                <section key={section.title} className="flex flex-col gap-0.5">
                  <p className="mb-2 text-xs text-muted-foreground">
                    {section.title}
                  </p>

                  {section.items.map((item) => {
                    const Icon = Icons[item.icon || "arrowRight"];
                    return (
                      item.href && (
                        <Fragment key={`link-fragment-${item.title}`}>
                          <Link
                            key={`link-${item.title}`}
                            href={item.disabled ? "#" : item.href}
                            className={cn(
                              "flex items-center gap-3 rounded-md p-2 text-sm font-medium hover:bg-muted",
                              path === item.href
                                ? "bg-muted"
                                : "text-muted-foreground hover:text-accent-foreground",
                              item.disabled &&
                                "cursor-not-allowed opacity-80 hover:bg-transparent hover:text-muted-foreground",
                            )}
                          >
                            <Icon className="size-5" />
                            {item.title}
                            {item.badge && (
                              <Badge className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full">
                                {item.badge}
                              </Badge>
                            )}
                          </Link>
                        </Fragment>
                      )
                    );
                  })}
                </section>
              ))}
            </nav>

            <div className="mt-auto xl:p-4">
              <UpgradeCard />
            </div>
          </div>
        </aside>
      </ScrollArea>
    </div>
  );
}

export function MobileSheetSidebar({ links }: DashboardSidebarProps) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { isSm, isMobile } = useMediaQuery();

  if (isSm || isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="size-9 shrink-0 md:hidden"
          >
            <Menu className="size-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <ScrollArea className="h-full overflow-y-auto">
            <div className="flex h-screen flex-col">
              <nav className="flex flex-1 flex-col gap-y-6 p-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Icons.logo className="size-6" />
                  <span className="font-urban text-xl font-bold">
                    {siteConfig.name}
                  </span>
                </Link>

                {links.map((section) => (
                  <section
                    key={section.title}
                    className="flex flex-col gap-0.5"
                  >
                    <p className="text-xs text-muted-foreground">
                      {section.title}
                    </p>

                    {section.items.map((item) => {
                      const Icon = Icons[item.icon || "arrowRight"];
                      return (
                        item.href && (
                          <Fragment key={`link-fragment-${item.title}`}>
                            <Link
                              key={`link-${item.title}`}
                              onClick={() => {
                                if (!item.disabled) setOpen(false);
                              }}
                              href={item.disabled ? "#" : item.href}
                              className={cn(
                                "flex items-center gap-3 rounded-md p-2 text-sm font-medium hover:bg-muted",
                                path === item.href
                                  ? "bg-muted"
                                  : "text-muted-foreground hover:text-accent-foreground",
                                item.disabled &&
                                  "cursor-not-allowed opacity-80 hover:bg-transparent hover:text-muted-foreground",
                              )}
                            >
                              <Icon className="size-5" />
                              {item.title}
                              {item.badge && (
                                <Badge className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full">
                                  {item.badge}
                                </Badge>
                              )}
                            </Link>
                          </Fragment>
                        )
                      );
                    })}
                  </section>
                ))}

                <div className="mt-auto">
                  <UpgradeCard />
                </div>
              </nav>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="flex size-9 animate-pulse rounded-lg bg-muted md:hidden" />
  );
}
