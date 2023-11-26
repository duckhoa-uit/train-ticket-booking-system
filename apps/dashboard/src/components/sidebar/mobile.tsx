"use client";

import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@ttbs/ui";
import { Train, Menu } from "@ttbs/ui/components/icons";

import { SidebarUserPopover } from "../user-popover";

type Props = {
  navigation: {
    href: string;
    external?: boolean;
    label: string;
  }[];
};

export const MobileSidebar: React.FC<Props> = ({}) => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <div className="sticky top-0 z-40 flex w-full items-center justify-end gap-x-6 bg-zinc-950 px-4 py-4 sm:px-6 lg:hidden">
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
        </div>
        <SheetContent position="bottom" size="content">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-center gap-2">
              {" "}
              <Train className="h-8 w-8 duration-200 " />
              Dashboard
            </SheetTitle>
            {/* <SheetDescription>
                            Make changes to your profile here. Click save when you're done.
                        </SheetDescription> */}
          </SheetHeader>
          <div className="space-y-4">
            <div className="px-6 py-2">
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">{/* Events */}</h2>
              <div className="space-y-1">
                {/* <Link href="/overview">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Home className="mr-2 h-4 w-4" />
                    Overview
                  </Button>
                </Link>
                <Link href="/keys">
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
          <SheetFooter>
            <SidebarUserPopover />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
