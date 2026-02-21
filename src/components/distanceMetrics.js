const TOTAL_FIELD =
  'Distance travelled to work: Total: All usual residents aged 16 years and over in employment the week before the census'
const LT2 = 'Distance travelled to work: Less than 2km'
const D2_5 = 'Distance travelled to work: 2km to less than 5km'
const D5_10 = 'Distance travelled to work: 5km to less than 10km'
const D10_20 = 'Distance travelled to work: 10km to less than 20km'
const D20_30 = 'Distance travelled to work: 20km to less than 30km'
const D30_40 = 'Distance travelled to work: 30km to less than 40km'
const D40_60 = 'Distance travelled to work: 40km to less than 60km'
const D60_PLUS = 'Distance travelled to work: 60km and over'

//compute the avg distance and ratio for each MSOA
export function enrichDistanceFeature(feature) {
  //read original grouped counts
  const total = Number(feature.properties[TOTAL_FIELD]) || 0
  const cLt2 = Number(feature.properties[LT2]) || 0
  const c2_5 = Number(feature.properties[D2_5]) || 0
  const c5_10 = Number(feature.properties[D5_10]) || 0
  const c10_20 = Number(feature.properties[D10_20]) || 0
  const c20_30 = Number(feature.properties[D20_30]) || 0
  const c30_40 = Number(feature.properties[D30_40]) || 0
  const c40_60 = Number(feature.properties[D40_60]) || 0
  const c60Plus = Number(feature.properties[D60_PLUS]) || 0

  //ratio of commuters with distance over 5 km
  const longCount = c5_10 + c10_20 + c20_30 + c30_40 + c40_60 + c60Plus
  const longRate = total > 0 ? (longCount / total) * 100 : 0

  //average distance to work.(class midpoint)
  const commuteKnown = cLt2 + c2_5 + c5_10 + c10_20 + c20_30 + c30_40 + c40_60 + c60Plus
  const weightedKm =
    cLt2 * 1 +
    c2_5 * 3.5 +
    c5_10 * 7.5 +
    c10_20 * 15 +
    c20_30 * 25 +
    c30_40 * 35 +
    c40_60 * 50 +
    c60Plus * 70

  const avgKm = commuteKnown > 0 ? weightedKm / commuteKnown : 0

  //return feature with added metric properties
  return {
    ...feature,
    properties: {
      ...feature.properties,
      longRate,
      avgKm,
    },
  }
}
