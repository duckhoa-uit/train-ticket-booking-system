import { provinces } from "@ttbs/lib/constants";

export const provinceOpts = provinces.map((p) => ({
  label: p.name,
  value: p.codename,
}));
