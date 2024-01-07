"use client";

import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

import { useClientTranslation } from "@ttbs/i18n";
import { cn } from "@ttbs/lib/cn";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ttbs/ui";
import { ChevronDown, LogOut, User as UserIcon } from "@ttbs/ui/components/icons";

interface UserDropdownProps {
  small?: boolean;
}

export function UserDropdown({ small }: UserDropdownProps) {
  const { t } = useClientTranslation();
  const { data } = useSession();
  const user = data ? data.user : null;

  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent rendering dropdown if user isn't available.
  // We don't want to show nameless user.
  if (!user) {
    return null;
  }

  return (
    <Dropdown open={menuOpen}>
      <DropdownMenuTrigger asChild onClick={() => setMenuOpen((menuOpen) => !menuOpen)}>
        <Button
          color="minimal"
          className={cn(
            "hover:bg-emphasis group mx-0 flex cursor-pointer appearance-none items-center rounded-full text-left outline-none focus:outline-none focus:ring-0 md:rounded-none lg:rounded",
            small ? "p-2" : "px-2 py-1.5"
          )}
        >
          <span
            className={cn(
              small ? "h-4 w-4" : "h-5 w-5 ltr:mr-2 rtl:ml-2",
              "relative flex-shrink-0 rounded-full "
            )}
          >
            <Avatar
              size={small ? "xs" : "xsm"}
              imageSrc={user.image}
              // imageSrc={`${bookerUrl}/${user.username}/avatar.png`}
              alt={user.username || "Nameless User"}
              className="overflow-hidden"
            />
          </span>
          {!small && (
            <span className="flex flex-grow items-center gap-2">
              <span className="line-clamp-1 flex-grow text-sm leading-none">
                <span className="text-emphasis block font-medium">{user.name || "Nameless User"}</span>
              </span>
              <ChevronDown
                className="group-hover:text-subtle text-muted h-4 w-4 flex-shrink-0 rtl:mr-4"
                aria-hidden="true"
              />
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          align="start"
          onInteractOutside={() => {
            setMenuOpen(false);
          }}
          className="group overflow-hidden rounded-md"
        >
          <DropdownMenuItem>
            <DropdownItem type="button" StartIcon={UserIcon} href="/settings/my-account/profile">
              {t("my_profile")}
            </DropdownItem>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <DropdownItem
              type="button"
              StartIcon={LogOut}
              onClick={() => signOut({ callbackUrl: "/auth/logout" })}
            >
              {t("sign_out")}
            </DropdownItem>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </Dropdown>
  );
}
