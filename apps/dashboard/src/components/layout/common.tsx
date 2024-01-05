"use client";

import type { User as UserAuth } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Dispatch, ElementType, ReactElement, ReactNode, SetStateAction } from "react";
import React, { Fragment, cloneElement } from "react";

import { useClientTranslation } from "@ttbs/i18n";
import { cn } from "@ttbs/lib/cn";
import type { SVGComponent } from "@ttbs/types/SVGComponent";
import { Button, ButtonOrLink, Credits, SkeletonText, Tooltip } from "@ttbs/ui";
import {
  ArrowLeft,
  ArrowRight,
  MoreHorizontal,
  Settings,
  Train,
  CalendarDays,
  Luggage,
} from "@ttbs/ui/components/icons";

import { KBarTrigger } from "@/components/kbar/Kbar";

import { KBarWrapper } from "../kbar/wrapper";
import { UserDropdown } from "./user-dropdown";

export const Layout = (props: LayoutProps) => {
  // const pageTitle = typeof props.heading === "string" && !props.title ? props.heading : props.title;

  return (
    <>
      {/* {!props.withoutSeo && (
        <HeadSeo
          title={pageTitle ?? APP_NAME}
          description={props.subtitle ? props.subtitle?.toString() : ""}
        />
      )} */}

      <div className="flex min-h-screen flex-col">
        <div className="flex max-h-screen flex-1" data-testid="dashboard-shell">
          {props.SidebarContainer ? cloneElement(props.SidebarContainer) : <SideBarContainer />}
          <div className="flex w-0 flex-1 flex-col">
            <MainContainer {...props} />
          </div>
        </div>
      </div>
    </>
  );
};

type DrawerState = [isOpen: boolean, setDrawerOpen: Dispatch<SetStateAction<boolean>>];

type LayoutProps = {
  centered?: boolean;
  title?: string;
  heading?: ReactNode;
  subtitle?: ReactNode;
  headerClassName?: string;
  children: ReactNode;
  CTA?: ReactNode;
  large?: boolean;
  MobileNavigationContainer?: ReactNode;
  SidebarContainer?: ReactElement;
  TopNavContainer?: ReactNode;
  drawerState?: DrawerState;
  HeadingLeftIcon?: ReactNode;
  backPath?: string | boolean; // renders back button to specified path
  // use when content needs to expand with flex
  flexChildrenContainer?: boolean;
  isPublic?: boolean;
  withoutMain?: boolean;
  // Gives you the option to skip HeadSEO and render your own.
  withoutSeo?: boolean;
  // Gives the ability to include actions to the right of the heading
  actions?: JSX.Element;
  beforeCTAactions?: JSX.Element;
  smallHeading?: boolean;
  hideHeadingOnMobile?: boolean;
};

export default function Shell(props: LayoutProps) {
  return (
    <KBarWrapper withKBar>
      <Layout {...props} />
    </KBarWrapper>
  );
}

export type NavigationItemType = {
  name: string;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  target?: HTMLAnchorElement["target"];
  badge?: React.ReactNode;
  icon?: SVGComponent | ElementType;
  child?: NavigationItemType[];
  pro?: true;
  onlyMobile?: boolean;
  onlyDesktop?: boolean;
  isCurrent?: ({
    item,
    isChild,
    pathname,
  }: {
    item: Pick<NavigationItemType, "href">;
    isChild?: boolean;
    pathname: string;
  }) => boolean;
};

const MORE_SEPARATOR_NAME = "more";

const navigation: NavigationItemType[] = [
  {
    name: "journeys_page_title",
    href: "/journeys",
    icon: CalendarDays,
    isCurrent: ({ item }) => {
      return item.href.startsWith("/journeys") || item.href.startsWith("/stations");
    },
    child: [
      {
        name: "stations_page_title",
        href: "/stations",
        isCurrent: ({ pathname: path, item }) => {
          return path?.includes(item.href);
        },
      },
      {
        name: "journeys_page_title",
        href: "/journeys",
        isCurrent: ({ pathname: path, item }) => {
          return path?.includes(item.href);
        },
      },
    ],
  },
  {
    name: "trains_page_title",
    href: "/trains",
    icon: Train,
    isCurrent: ({ item }) => {
      return item.href.startsWith("/seat-types") || item.href.startsWith("/trains");
    },
    child: [
      {
        name: "seat_types_page_title",
        href: "/seat-types",
        isCurrent: ({ pathname: path, item }) => {
          return path?.includes(item.href);
        },
      },
      {
        name: "trains_page_title",
        href: "/trains",
        isCurrent: ({ pathname: path, item }) => {
          return path?.includes(item.href);
        },
      },
    ],
  },
  {
    name: "trips_page_title",
    href: "/trips",
    icon: Luggage,
    isCurrent: ({ pathname: path, item }) => {
      return path?.includes(item.href);
    },
  },
  {
    name: MORE_SEPARATOR_NAME,
    href: "/more",
    icon: MoreHorizontal,
  },
];

const moreSeparatorIndex = navigation.findIndex((item) => item.name === MORE_SEPARATOR_NAME);
// We create all needed navigation items for the different use cases
const { desktopNavigationItems, mobileNavigationBottomItems, mobileNavigationMoreItems } = navigation.reduce<
  Record<string, NavigationItemType[]>
>(
  (items, item, index) => {
    // We filter out the "more" separator in` desktop navigation
    if (item.name !== MORE_SEPARATOR_NAME) items.desktopNavigationItems.push(item);
    // Items for mobile bottom navigation
    if (index < moreSeparatorIndex + 1 && !item.onlyDesktop) {
      items.mobileNavigationBottomItems.push(item);
    } // Items for the "more" menu in mobile navigation
    else {
      items.mobileNavigationMoreItems.push(item);
    }
    return items;
  },
  { desktopNavigationItems: [], mobileNavigationBottomItems: [], mobileNavigationMoreItems: [] }
);

const Navigation = () => {
  return (
    <nav className="mt-2 flex-1 md:px-2 lg:mt-4 lg:px-0">
      {desktopNavigationItems.map((item) => (
        <NavigationItem key={item.name} item={item} />
      ))}
      <div className="text-subtle mt-0.5 lg:hidden">
        <KBarTrigger />
      </div>
    </nav>
  );
};

const defaultIsCurrent: NavigationItemType["isCurrent"] = ({ isChild, item, pathname }) => {
  return isChild ? item.href === pathname : item.href ? pathname?.startsWith(item.href) : false;
};

const NavigationItem: React.FC<{
  index?: number;
  item: NavigationItemType;
  isChild?: boolean;
}> = (props) => {
  const { item, isChild } = props;
  const { t, ready: isLocaleReady } = useClientTranslation();
  const pathname = usePathname();
  const isCurrent: NavigationItemType["isCurrent"] = item.isCurrent || defaultIsCurrent;
  const current = isCurrent({ isChild: !!isChild, item, pathname });

  return (
    <Fragment>
      <Tooltip side="right" content={t(item.name)} className="lg:hidden">
        <Link
          href={item.href}
          aria-label={t(item.name)}
          className={cn(
            "text-default group flex items-center rounded-md px-2 py-1.5 text-sm font-medium",
            item.child ? `[&[aria-current='page']]:bg-transparent` : `[&[aria-current='page']]:bg-emphasis`,
            isChild
              ? `[&[aria-current='page']]:text-emphasis [&[aria-current='page']]:bg-emphasis hidden h-8 pl-16 lg:flex lg:pl-11 ${
                  props.index === 0 ? "mt-0" : "mt-px"
                }`
              : "[&[aria-current='page']]:text-emphasis mt-0.5 text-sm",
            isLocaleReady ? "hover:bg-emphasis hover:text-emphasis" : ""
          )}
          aria-current={current ? "page" : undefined}
        >
          {item.icon && (
            <item.icon
              className="mr-2 h-4 w-4 flex-shrink-0 md:ltr:mx-auto lg:ltr:mr-2 rtl:ml-2 [&[aria-current='page']]:text-inherit"
              aria-hidden="true"
              aria-current={current ? "page" : undefined}
            />
          )}
          {isLocaleReady ? (
            <span className="hidden w-full justify-between lg:flex">
              <div className="flex">{t(item.name)}</div>
              {item.badge && item.badge}
            </span>
          ) : (
            <SkeletonText className="h-[20px] w-full" />
          )}
        </Link>
      </Tooltip>
      {item.child &&
        isCurrent({ pathname, isChild, item }) &&
        item.child.map((item, index) => <NavigationItem index={index} key={item.name} item={item} isChild />)}
    </Fragment>
  );
};

function MobileNavigationContainer() {
  const { status } = useSession();
  if (status !== "authenticated") return null;
  return <MobileNavigation />;
}

const MobileNavigation = () => {
  return (
    <>
      <nav
        className={cn(
          "pwa:pb-2.5 bg-muted border-subtle fixed bottom-0 z-30 -mx-4 flex w-full border-t bg-opacity-40 px-1 shadow backdrop-blur-md md:hidden"
        )}
      >
        {mobileNavigationBottomItems.map((item) => (
          <MobileNavigationItem key={item.name} item={item} />
        ))}
      </nav>
      {/* add padding to content for mobile navigation*/}
      <div className="block pt-12 md:hidden" />
    </>
  );
};

const MobileNavigationItem: React.FC<{
  item: NavigationItemType;
  isChild?: boolean;
}> = (props) => {
  const { item, isChild } = props;
  const pathname = usePathname();
  const { t, ready: isLocaleReady } = useClientTranslation();
  const isCurrent: NavigationItemType["isCurrent"] = item.isCurrent || defaultIsCurrent;
  const current = isCurrent({ isChild: !!isChild, item, pathname });

  return (
    <Link
      key={item.name}
      href={item.href}
      className="[&[aria-current='page']]:text-emphasis hover:text-default text-muted relative my-2 min-w-0 flex-1 overflow-hidden rounded-md !bg-transparent p-1 text-center text-xs font-medium focus:z-10 sm:text-sm"
      aria-current={current ? "page" : undefined}
    >
      {item.badge && <div className="absolute right-1 top-1">{item.badge}</div>}
      {item.icon && (
        <item.icon
          className="[&[aria-current='page']]:text-emphasis  mx-auto mb-1 block h-5 w-5 flex-shrink-0 text-center text-inherit"
          aria-hidden="true"
          aria-current={current ? "page" : undefined}
        />
      )}
      {isLocaleReady ? <span className="block truncate">{t(item.name)}</span> : <SkeletonText />}
    </Link>
  );
};

const MobileNavigationMoreItem: React.FC<{
  item: NavigationItemType;
  isChild?: boolean;
}> = (props) => {
  const { item } = props;
  const { t } = useClientTranslation();

  return (
    <li className="border-subtle border-b last:border-b-0" key={item.name}>
      <Link href={item.href} className="hover:bg-subtle flex items-center justify-between p-5">
        <span className="text-default flex items-center font-semibold ">
          {item.icon && <item.icon className="h-5 w-5 flex-shrink-0 ltr:mr-3 rtl:ml-3" aria-hidden="true" />}
          {t(item.name)}
        </span>
        <ArrowRight className="text-subtle h-5 w-5" />
      </Link>
    </li>
  );
};

type SideBarProps = {
  user?: UserAuth | null;
};

function SideBarContainer() {
  const { status, data } = useSession();

  // Make sure that Sidebar is rendered optimistically so that a refresh of pages when logged in have SideBar from the beginning.
  // This improves the experience of refresh on app store pages(when logged in) which are SSG.
  // Though when logged out, app store pages would temporarily show SideBar until session status is confirmed.
  if (status !== "loading" && status !== "authenticated") return null;
  return <SideBar user={data?.user} />;
}

function SideBar({}: SideBarProps) {
  const { t, ready: isLocaleReady } = useClientTranslation();

  const bottomNavItems: NavigationItemType[] = [
    {
      name: "settings",
      href: "/settings/my-account/profile",
      icon: Settings,
    },
  ];
  return (
    <div className="relative">
      <aside className="desktop-transparent bg-muted border-muted fixed left-0 hidden h-full max-h-screen w-14 flex-col overflow-y-auto overflow-x-hidden border-r md:sticky md:flex lg:w-56 lg:px-3 dark:bg-gradient-to-tr dark:from-[#2a2a2a] dark:to-[#1c1c1c]">
        <div className="flex h-full flex-col justify-between py-3 lg:pt-4">
          <header className="items-center justify-between md:hidden lg:flex">
            <div data-testid="user-dropdown-trigger">
              <span className="hidden lg:inline">
                <UserDropdown />
              </span>
              <span className="hidden md:inline lg:hidden">
                <UserDropdown small />
              </span>
            </div>
            <div className="flex space-x-0.5 rtl:space-x-reverse">
              <button
                color="minimal"
                onClick={() => window.history.back()}
                className="desktop-only hover:text-emphasis text-subtle group flex text-sm font-medium"
              >
                <ArrowLeft className="group-hover:text-emphasis text-subtle h-4 w-4 flex-shrink-0" />
              </button>
              <button
                color="minimal"
                onClick={() => window.history.forward()}
                className="desktop-only hover:text-emphasis text-subtle group flex text-sm font-medium"
              >
                <ArrowRight className="group-hover:text-emphasis text-subtle h-4 w-4 flex-shrink-0" />
              </button>
              <KBarTrigger />
            </div>
          </header>

          <hr className="desktop-only border-subtle absolute -left-3 -right-3 mt-4 block w-full" />

          {/* logo icon for tablet */}
          <Link href="/event-types" className="text-center md:inline lg:hidden">
            <Train />
          </Link>

          <Navigation />
        </div>

        <div>
          {bottomNavItems.map(({ icon: Icon, ...item }, index) => (
            <Tooltip side="right" content={t(item.name)} className="lg:hidden" key={item.name}>
              <ButtonOrLink
                id={item.name}
                href={item.href || undefined}
                aria-label={t(item.name)}
                target={item.target}
                className={cn(
                  "text-left",
                  "[&[aria-current='page']]:bg-emphasis  text-default justify-right group flex items-center rounded-md px-2 py-1.5 text-sm font-medium",
                  "[&[aria-current='page']]:text-emphasis mt-0.5 w-full text-sm",
                  isLocaleReady ? "hover:bg-emphasis hover:text-emphasis" : "",
                  index === 0 && "mt-3"
                )}
                onClick={item.onClick}
              >
                {!!Icon && (
                  <Icon
                    className={cn(
                      "h-4 w-4 flex-shrink-0 [&[aria-current='page']]:text-inherit",
                      "me-3 md:mx-auto lg:ltr:mr-2 lg:rtl:ml-2"
                    )}
                    aria-hidden="true"
                  />
                )}
                {isLocaleReady ? (
                  <span className="hidden w-full justify-between lg:flex">
                    <div className="flex">{t(item.name)}</div>
                  </span>
                ) : (
                  <SkeletonText style={{ width: `${item.name.length * 10}px` }} className="h-[20px]" />
                )}
              </ButtonOrLink>
            </Tooltip>
          ))}
          <Credits />
        </div>
      </aside>
    </div>
  );
}

export function ShellMain(props: LayoutProps) {
  const router = useRouter();
  const { ready: isLocaleReady } = useClientTranslation();

  return (
    <>
      {(props.heading || !!props.backPath) && (
        <div
          className={cn(
            "flex items-center md:mb-6 md:mt-0",
            props.smallHeading ? "lg:mb-7" : "lg:mb-8",
            props.hideHeadingOnMobile ? "mb-0" : "mb-6"
          )}
        >
          {!!props.backPath && (
            <Button
              variant="icon"
              size="sm"
              color="minimal"
              onClick={() =>
                typeof props.backPath === "string" ? router.push(props.backPath as string) : router.back()
              }
              StartIcon={ArrowLeft}
              aria-label="Go Back"
              className="rounded-md ltr:mr-2 rtl:ml-2"
            />
          )}
          {props.heading && (
            <header className={cn(props.large && "py-8", "flex w-full max-w-full items-center truncate")}>
              {props.HeadingLeftIcon && <div className="ltr:mr-4">{props.HeadingLeftIcon}</div>}
              <div className={cn("w-full truncate md:block ltr:mr-4 rtl:ml-4", props.headerClassName)}>
                {props.heading && (
                  <h3
                    className={cn(
                      "font-cal text-emphasis inline max-w-28 truncate text-lg font-semibold tracking-wide sm:max-w-72 sm:text-xl md:block md:max-w-80 xl:max-w-full",
                      props.smallHeading ? "text-base" : "text-xl",
                      props.hideHeadingOnMobile && "hidden"
                    )}
                  >
                    {!isLocaleReady ? <SkeletonText invisible /> : props.heading}
                  </h3>
                )}
                {props.subtitle && (
                  <p className="text-default hidden text-sm md:block">
                    {!isLocaleReady ? <SkeletonText invisible /> : props.subtitle}
                  </p>
                )}
              </div>
              {props.beforeCTAactions}
              {props.CTA && (
                <div
                  className={cn(
                    props.backPath
                      ? "relative"
                      : "pwa:bottom-24 fixed bottom-20 z-40 md:z-auto ltr:right-4 md:ltr:right-0 rtl:left-4 md:rtl:left-0",
                    "flex-shrink-0 md:relative md:bottom-auto md:right-auto"
                  )}
                >
                  {isLocaleReady && props.CTA}
                </div>
              )}
              {props.actions && props.actions}
            </header>
          )}
        </div>
      )}
      <div className={cn(props.flexChildrenContainer && "flex flex-1 flex-col")}>{props.children}</div>
    </>
  );
}

function MainContainer({
  MobileNavigationContainer: MobileNavigationContainerProp = <MobileNavigationContainer />,
  TopNavContainer: TopNavContainerProp = <TopNavContainer />,
  ...props
}: LayoutProps) {
  return (
    <main className="bg-default relative z-0 flex-1 focus:outline-none">
      {/* show top navigation for md and smaller (tablet and phones) */}
      {TopNavContainerProp}
      <div className="max-w-full px-2 py-4 lg:px-6">
        {!props.withoutMain ? <ShellMain {...props}>{props.children}</ShellMain> : props.children}
        {/* show bottom navigation for md and smaller (tablet and phones) on pages where back button doesn't exist */}
        {!props.backPath ? MobileNavigationContainerProp : null}
      </div>
    </main>
  );
}

function TopNavContainer() {
  const { status } = useSession();
  if (status !== "authenticated") return null;
  return <TopNav />;
}

function TopNav() {
  const { t } = useClientTranslation();
  return (
    <>
      <nav className="bg-muted border-subtle sticky top-0 z-40 flex w-full items-center justify-between border-b bg-opacity-50 px-4 py-1.5 backdrop-blur-lg sm:p-4 md:hidden">
        <Link href="/event-types">
          <Train />
        </Link>
        <div className="flex items-center gap-2 self-center">
          <span className="hover:bg-muted hover:text-emphasis text-default group flex items-center rounded-full text-sm font-medium lg:hidden">
            <KBarTrigger />
          </span>
          <button className="hover:bg-muted hover:text-subtle text-muted rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
            <span className="sr-only">{t("settings")}</span>
            <Link href="/settings/my-account/profile">
              <Settings className="text-default h-4 w-4" aria-hidden="true" />
            </Link>
          </button>
          <UserDropdown small />
        </div>
      </nav>
    </>
  );
}

export const MobileNavigationMoreItems = () => (
  <ul className="border-subtle mt-2 rounded-md border">
    {mobileNavigationMoreItems.map((item) => (
      <MobileNavigationMoreItem key={item.name} item={item} />
    ))}
  </ul>
);
