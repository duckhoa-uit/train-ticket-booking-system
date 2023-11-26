"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const vercelCommitHash = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
const commitHash = vercelCommitHash ? `${vercelCommitHash.slice(0, 7)}` : "";

export default function Credits() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <small className="text-default mx-3 mb-2 mt-1 hidden text-[0.5rem] opacity-50 lg:block">
      &copy; {new Date().getFullYear()}{" "}
      <Link href="https://easy-boarding.id.vn" target="_blank" className="hover:underline">
        easy-boarding.id.vn
      </Link>{" "}
      {hasMounted && (
        <>
          {vercelCommitHash ? (
            <Link
              href={`https://github.com/duckhoa-uit/train-ticket-booking-system/commit/${vercelCommitHash}`}
              target="_blank"
              className="hover:underline"
            >
              {commitHash}
            </Link>
          ) : (
            commitHash
          )}
        </>
      )}
    </small>
  );
}
