import { Popup } from 'react-map-gl/maplibre'
import SimpleChart from './SimpleChart'

const distance_bins = [
  { label: '<2', field: 'Distance travelled to work: Less than 2km' },
  { label: '2-5', field: 'Distance travelled to work: 2km to less than 5km' },
  { label: '5-10', field: 'Distance travelled to work: 5km to less than 10km' },
  { label: '10-20', field: 'Distance travelled to work: 10km to less than 20km' },
  { label: '20-30', field: 'Distance travelled to work: 20km to less than 30km' },
  { label: '30-40', field: 'Distance travelled to work: 30km to less than 40km' },
  { label: '40-60', field: 'Distance travelled to work: 40km to less than 60km' },
  { label: '60+', field: 'Distance travelled to work: 60km and over' },
]

function buildMsoaDistanceChartData(feature) {
  const props = feature?.properties
  if (!props) return null

  const labels = distance_bins.map((x) => x.label)
  const values = distance_bins.map((x) => Number(props[x.field]) || 0)

  return {
    labels,
    datasets: [
      {
        label: 'Residents',
        data: values,
        backgroundColor: 'rgba(37, 99, 235, 0.7)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 1,
        borderRadius: 3,
      },
    ],
  }
}

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
          maxWidth="420px"
          onClose={() => setSelectedMsoa(null)}
        >
          <div style={{ width: 360 }}>
            <div style={{ fontWeight: 600 }}>{selectedMsoa.properties?.geography}</div>
            <div style={{ fontSize: 12 }}>
              Ratio that commute distance is 5km+：{Number(selectedMsoa.properties?.longRate || 0).toFixed(1)}%
            </div>
            <div style={{ fontSize: 12 }}>
              Average commute distance：{Number(selectedMsoa.properties?.avgKm || 0).toFixed(1)} km
            </div>
            <SimpleChart
              data={buildMsoaDistanceChartData(selectedMsoa)}
              title="Distance to Work Distribution"
              height={170}
              xAxisTitle="Distance(km)"
              yAxisTitle="Residents"
            />
          </div>
        </Popup>
      )}
    </>
  )
}
