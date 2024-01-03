import { usePathname, useRouter } from "next/navigation";

import { useCompatSearchParams } from "@ttbs/lib";

export function useSetStep() {
  const router = useRouter();
  const searchParams = useCompatSearchParams();
  const pathname = usePathname();

  const setStep = (newStep = 1) => {
    const _searchParams = new URLSearchParams(searchParams ?? undefined);
    _searchParams.set("step", newStep.toString());
    router.replace(`${pathname}?${_searchParams.toString()}`);
  };
  return setStep;
}
