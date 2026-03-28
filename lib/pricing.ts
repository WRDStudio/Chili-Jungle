export function calculateOrderTotals(clasicoQty: number, tropicalQty: number) {
  const totalUnits = clasicoQty + tropicalQty;
  if (totalUnits === 0) {
    return {
      totalUnits: 0,
      bundlePairs: 0,
      remainingSingles: 0,
      totalUSD: 0,
      totalCRC: 0,
      savingsUSD: 0,
      savingsCRC: 0,
      avgCRC: 0,
    };
  }

  const bundlePairs = Math.floor(totalUnits / 2);
  const remainingSingles = totalUnits % 2;

  // Pricing rules
  // 1 single item = $10 / ₡5000
  // 1 pair (bundle) = $18 / ₡9000
  const totalUSD = (bundlePairs * 18) + (remainingSingles * 10);
  const totalCRC = (bundlePairs * 9000) + (remainingSingles * 5000);

  const savingsUSD = (totalUnits * 10) - totalUSD;
  const savingsCRC = (totalUnits * 5000) - totalCRC;
  const avgCRC = totalUnits > 0 ? Math.round(totalCRC / totalUnits) : 0;

  return {
    totalUnits,
    bundlePairs,
    remainingSingles,
    totalUSD,
    totalCRC,
    savingsUSD,
    savingsCRC,
    avgCRC,
  };
}
