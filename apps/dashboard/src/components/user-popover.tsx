"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import {
  Avatar,
  Dropdown,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ttbs/ui";
import { Book, ChevronsUpDown, LogOut, Plus, Rocket } from "@ttbs/ui/components/icons";

export const SidebarUserPopover: React.FC = (): JSX.Element => {
  const { data } = useSession();
  const user = data ? data.user : null;

  return (
    <Dropdown>
      <DropdownMenuTrigger className="flex w-full items-center justify-between gap-4 rounded px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-700">
        <div className="flex w-full items-center justify-start gap-4 ">
          <Avatar imageSrc={user?.image} alt={user?.name ?? ""} />
          {/* <span>{currentOrg?.name ?? "Personal"}</span> */}
        </div>
        {/* <PlanBadge plan={currentTeam?.plan ?? "DISABLED"} /> */}
        <ChevronsUpDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full lg:w-56" align="end" forceMount>
        <DropdownMenuGroup>
          <Link href="/onboarding">
            <DropdownMenuItem>
              <Rocket className="mr-2 h-4 w-4" />
              <span>Onboarding</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/docs" target="_blank">
            <DropdownMenuItem>
              <Book className="mr-2 h-4 w-4" />
              <span>Docs</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <Plus className="mr-2 h-4 w-4" />
            <span>Create Team</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <button onClick={async () => signOut()} className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </Dropdown>
  );
};
