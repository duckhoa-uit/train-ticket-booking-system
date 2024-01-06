export const getPercentage = (actualMetric: number, previousMetric: number) => {
  const differenceActualVsPrevious = actualMetric - previousMetric;
  if (differenceActualVsPrevious === 0) {
    return 0;
  }
  const result = (differenceActualVsPrevious * 100) / previousMetric;
  if (isNaN(result) || !isFinite(result)) {
    return 0;
  }
  return result;
};
