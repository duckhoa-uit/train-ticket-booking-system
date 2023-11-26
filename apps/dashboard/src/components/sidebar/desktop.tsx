import Link from "next/link";

import { LinkIconButton } from "@ttbs/ui";
import { Home, Train } from "@ttbs/ui/components/icons";

import { SidebarUserPopover } from "../user-popover";

type Props = {
  navigation: {
    href: string;
    external?: boolean;
    label: string;
  }[];
};

export const DesktopSidebar: React.FC<Props> = () => {
  return (
    <aside className="relative hidden min-h-screen border-r border-white/10 pb-12 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <Link
        href="/overview"
        className="flex items-center gap-2 stroke-zinc-800 px-8 py-6 text-2xl font-semibold tracking-tight duration-200 hover:stroke-zinc-700 hover:text-zinc-700 dark:stroke-zinc-500 dark:text-zinc-200 dark:hover:stroke-white dark:hover:text-white"
      >
        <Train className="h-8 w-8 duration-200 " />
        Dashboard
      </Link>
      <div className="space-y-4">
        <div className="px-6 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">{/* Events */}</h2>
          <div className="space-y-1">
            <Link href="/overview">
              {/* <Button variant="ghost" size="sm" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Overview
              </Button> */}
              <LinkIconButton Icon={Home}>CCC</LinkIconButton>
            </Link>
            {/* <Link href="/keys">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <FileKey className="mr-2 h-4 w-4" />
                API Keys
              </Button>
            </Link>
            <Link href="/channels">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Database className="mr-2 h-4 w-4" />
                Channels
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-8 mx-6">
        <SidebarUserPopover />
      </div>
    </aside>
  );
};
