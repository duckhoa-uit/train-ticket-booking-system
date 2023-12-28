"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { useMediaQuery } from "@ttbs/lib";
import { cn } from "@ttbs/lib/cn";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  Sheet,
  SheetContent,
  navigationMenuTriggerStyle,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ttbs/ui";
import { ChevronDown } from "@ttbs/ui/components/icons";

import BurgerMenu from "./burger-menu/burger-menu";

type NavItem = { title: string; description?: string } & (
  | { href: string }
  | { children: { title: string; href: string; description?: string }[] }
);
const NAVIGATION_ITEMS: NavItem[] = [
  {
    title: "thông tin đặt chỗ",
    href: "/booking-information",
  },
  {
    title: "Vé",
    href: "/tickets",
    children: [
      {
        title: "Tìm vé",
        href: "/search",
      },
      {
        title: "trả vé",
        href: "/return-ticket",
      },
      {
        title: "kiểm tra vé",
        href: "/check-ticket",
      },
    ],
  },
  {
    title: "khuyến mãi",
    href: "/promotions",
  },
  {
    title: "các quy định",
    href: "/rules",
  },
  {
    title: "hướng dẫn",
    href: "/guide",
  },
  {
    title: "liên hệ",
    href: "/contact",
  },
];

const Header = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const isMobileOrTablet = useMediaQuery("(max-width: 768px)");

  function handleClickMenuIcon() {
    setOpenMobileMenu(!openMobileMenu);
  }

  return (
    <header className="bg-white">
      <div className="text-subtle relative flex max-w-7xl flex-col items-center p-3 capitalize md:mx-auto md:flex-row md:justify-around md:align-middle md:text-sm">
        <div className=" flex w-full items-center justify-between gap-3 px-2 md:w-auto">
          <Link href="/">
            <Image
              src="/logoipsum.svg"
              width={200}
              height={40}
              alt="logoipsum"
            />
          </Link>
          <div>
            <BurgerMenu
              className="z-10 box-border flex w-10 rounded hover:cursor-pointer md:hidden md:w-12"
              handleClick={handleClickMenuIcon}
              id="btn-menu"
              openState={openMobileMenu}
            />
          </div>
        </div>
        {isMobileOrTablet ? (
          <Sheet open={openMobileMenu} onOpenChange={setOpenMobileMenu}>
            <SheetContent
              position="right"
              size="default"
              className="w-1/2 min-w-[250px]"
            >
              <div className="flex w-full flex-col items-center">
                <Navigation isMobileOrTablet />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <ul
            className={cn(
              `text-emphasis static z-20 mr-5 hidden flex-1 flex-row justify-end gap-2 rounded-md p-2 transition-all duration-500 ease-in-out md:flex `,
            )}
          >
            <Navigation />
          </ul>
        )}
      </div>
    </header>
  );
};

const Navigation = ({ isMobileOrTablet }: { isMobileOrTablet?: boolean }) => (
  <NavigationMenu
    orientation={isMobileOrTablet ? "vertical" : "horizontal"}
    className="capitalize"
  >
    <NavigationMenuList className={cn(isMobileOrTablet ? "flex-col" : null)}>
      {NAVIGATION_ITEMS.map((nav, idx) => {
        if ("children" in nav) {
          if (isMobileOrTablet)
            return (
              <Collapsible
                key={`${nav.title}_${idx}`}
                className="flex flex-col items-center"
              >
                <CollapsibleTrigger>
                  <NavigationMenuItem className="flex items-center">
                    {nav.title}{" "}
                    <ChevronDown
                      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </NavigationMenuItem>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {nav.children.map((navItem) => (
                    <ListItem
                      key={navItem.title}
                      title={navItem.title}
                      href={navItem.href}
                    >
                      {navItem.description}
                    </ListItem>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            );

          return (
            <NavigationMenuItem key={`${nav.title}_${idx}`}>
              <NavigationMenuTrigger>{nav.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] grid-cols-1 gap-3 p-4">
                  {nav.children.map((navItem) => (
                    <ListItem
                      key={navItem.title}
                      title={navItem.title}
                      href={navItem.href}
                    >
                      {navItem.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        }
        return (
          <NavigationMenuItem key={`${nav.href}_${idx}`}>
            <Link href={nav.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {nav.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        );
      })}
    </NavigationMenuList>
  </NavigationMenu>
);

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "hover:bg-muted hover:text-muted-foreground focus:bg-muted focus:text-muted-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Header;
