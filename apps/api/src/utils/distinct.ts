export const distinct = <T>(arr: T[], indexedKeys: (keyof T)[], isPrioritizeFormer = true): T[] => {
  const lookup = new Map<string, T>();
  const makeIndex = (el: T): string => indexedKeys.reduce((index, key) => `${index};;${el[key]}`, '');

  arr.forEach((el) => {
    const index = makeIndex(el);
    if (lookup.has(index) && isPrioritizeFormer) {
      return;
    }
    lookup.set(index, el);
  });

  return Array.from(lookup.values());
};
