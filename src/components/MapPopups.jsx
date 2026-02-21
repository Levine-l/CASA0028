import { Popup } from 'react-map-gl/maplibre'

//format station lines to readable text
function getStationLines(feature) {
  const raw = feature?.properties?.lines
  if (!raw) return ''
  if (!Array.isArray(raw)) return String(raw)
  return raw.map((x) => (typeof x === 'string' ? x : x?.name)).filter(Boolean).join(', ')
}

export default function MapPopups({
  selectedStation,
  setSelectedStation,
  selectedMsoa,
  setSelectedMsoa,
}) {
  return (
    <>
      {/*station popup*/}
      {selectedStation && (
        <Popup
          longitude={selectedStation.geometry.coordinates[0]}
          latitude={selectedStation.geometry.coordinates[1]}
          anchor="top"
          onClose={() => setSelectedStation(null)}
        >
          <div>
            <div style={{ fontWeight: 600 }}>{selectedStation.properties?.name || 'Station'}</div>
            <div style={{ fontSize: 12, color: '#4b5563' }}>{getStationLines(selectedStation)}</div>
          </div>
        </Popup>
      )}

      {/*MSOA popup*/}
      {selectedMsoa && (
        <Popup
          longitude={Number(selectedMsoa.properties?.LONG)}
          latitude={Number(selectedMsoa.properties?.LAT)}
          anchor="top"
          onClose={() => setSelectedMsoa(null)}
        >
          <div>
            <div style={{ fontWeight: 600 }}>{selectedMsoa.properties?.geography}</div>
            <div style={{ fontSize: 12 }}>
              Ratio that commute distance is 5km+：{Number(selectedMsoa.properties?.longRate || 0).toFixed(1)}%
            </div>
            <div style={{ fontSize: 12 }}>
              Average commute distance：{Number(selectedMsoa.properties?.avgKm || 0).toFixed(1)} km
            </div>
          </div>
        </Popup>
      )}
    </>
  )
}
