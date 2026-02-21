import { useEffect, useMemo, useState } from 'react'
import { Layer, Map, Source } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
//map legend components
import MapLegend from './MapLegend'
import DistanceLegend from './DistanceLegend'
import MapControls from './MapControls'
import MapPopups from './MapPopups'
import { enrichDistanceFeature } from './distanceMetrics'
//import geojson asset urls
import linesUrl from '../../data/tfl_lines.geojson?url'
import stationsUrl from '../../data/tfl_stations.geojson?url'
import distanceUrl from '../../data/distance_tw_ldn_simp.geojson?url'

//Tube line color mapping
const LINE_COLORS = {
  Bakerloo: '#B36305',
  Central: '#E32017',
  Circle: '#FFD300',
  District: '#00782A',
  'Hammersmith & City': '#F3A9BB',
  Jubilee: '#A0A5A9',
  Metropolitan: '#9B0056',
  Northern: '#000000',
  Piccadilly: '#003688',
  Victoria: '#0098D4',
  'Waterloo & City': '#95CDBA',
  DLR: '#00A4A7',
  'London Overground': '#EE7C0E',
  'Elizabeth line': '#6950A1',
  Tramlink: '#84B817',
  'IFS Cloud Cable Car': '#E21836',
  'Thameslink 6tph line': '#F58025',
  'East London': '#EE7C0E',
  'Crossrail 2': '#B5A400',
}

//extract line name from feature properties
function getLineName(feature) {
  const first = feature?.properties?.lines?.[0]
  if (!first) return 'Unknown'
  if (typeof first === 'string') return first
  return first.name || 'Unknown'
}

export default function MapDisplay() {
  //the original data states
  const [linesData, setLinesData] = useState(null)
  const [stationsData, setStationsData] = useState(null)
  const [distanceData, setDistanceData] = useState(null)

  //the states for interaction
  const [selectedStation, setSelectedStation] = useState(null)
  const [selectedMsoa, setSelectedMsoa] = useState(null)
  const [distanceMetric, setDistanceMetric] = useState('ratio5') //choose ratio5 or avgKm
  const [showMsoa, setShowMsoa] = useState(true)
  const [showSources, setShowSources] = useState(false)
  const [error, setError] = useState('')

  //fetch and load data
  useEffect(() => {
    async function loadData() {
      try {
        const [linesRes, stationsRes, distanceRes] = await Promise.all([
          fetch(linesUrl),
          fetch(stationsUrl),
          fetch(distanceUrl),
        ])

        if (!linesRes.ok || !stationsRes.ok || !distanceRes.ok) {
          throw new Error('GeoJSON load failed')
        }

        const [linesJson, stationsJson, distanceJson] = await Promise.all([
          linesRes.json(),
          stationsRes.json(),
          distanceRes.json(),
        ])

        setLinesData(linesJson)
        setStationsData(stationsJson)
        setDistanceData(distanceJson)
      } catch (e) {
        setError(e.message || 'Failed to load map data')
      }
    }

    loadData()
  }, [])

  //add lineName for tube lines
  const linesForMap = useMemo(() => {
    if (!linesData) return null
    return {
      ...linesData,
      features: linesData.features.map((f) => ({
        ...f,
        properties: {
          ...f.properties,
          lineName: getLineName(f),
        },
      })),
    }
  }, [linesData])

  //add computed metrics for distance data: longRate and avgKm
  const distanceForMap = useMemo(() => {
    if (!distanceData) return null
    return {
      ...distanceData,
      features: distanceData.features.map(enrichDistanceFeature),
    }
  }, [distanceData])


  //mapping line name to color(fallback to gray if unmatched)
  const lineColorExpression = useMemo(
    () => ['match', ['get', 'lineName'], ...Object.entries(LINE_COLORS).flat(), '#64748b'],
    []
  )

  //MSOA fill layer style(choropleth by selected metric)
  const msoaFillLayer = useMemo(
    () => ({
      id: 'msoa-fill',
      type: 'fill',
      layout: { visibility: showMsoa ? 'visible' : 'none' },
      paint: {
        'fill-color':
          distanceMetric === 'ratio5'
            ? [
                'step',
                ['get', 'longRate'],
                '#f7fbff',
                5, '#deebf7',
                10, '#c6dbef',
                20, '#9ecae1',
                30, '#6baed6',
                40, '#3182bd', // color classes for ratio5
              ]
            : [
                'step',
                ['get', 'avgKm'],
                '#f7fbff',
                5, '#deebf7',
                8, '#c6dbef',
                12, '#9ecae1',
                16, '#6baed6',
                20, '#3182bd', // color classes for avgKm
              ],
        'fill-opacity': 0.6,
      },
    }),
    [showMsoa, distanceMetric]
  )


  //MSOA boundary line layer
  const msoaLineLayer = useMemo(
    () => ({
      id: 'msoa-line',
      type: 'line',
      layout: { visibility: showMsoa ? 'visible' : 'none' },
      paint: {
        'line-color': '#ffffff',
        'line-width': 0.45,
        'line-opacity': 0.8,
      },
    }),
    [showMsoa]
  )

  //white outline layer for tube lines
  const lineCasingLayer = useMemo(
    () => ({
      id: 'lines-casing',
      type: 'line',
      paint: {
        'line-color': '#ffffff',
        'line-width': 2.6,
        'line-opacity': 0.9,
      },
    }),
    []
  )

  //layer for tube line
  const lineLayer = useMemo(
    () => ({
      id: 'lines-layer',
      type: 'line',
      paint: {
        'line-color': lineColorExpression,
        'line-width': 1.8,
        'line-opacity': 0.95,
      },
    }),
    [lineColorExpression]
  )

  //station point layer
  const stationLayer = useMemo(
    () => ({
      id: 'stations-layer',
      type: 'circle',
      minzoom: 11.2, //only show when zoomed in
      paint: {
        'circle-radius': 4.2,
        'circle-color': '#ffffff',
        'circle-stroke-color': '#111827',
        'circle-stroke-width': 1.3,
      },
    }),
    []
  )

  //map click handler(station first, then MSOA)
  const handleClick = (event) => {
    const features = event.features || []
    const station = features.find((f) => f.layer?.id === 'stations-layer')
    const msoa = features.find((f) => f.layer?.id === 'msoa-fill')

    if (station) {
      setSelectedStation(station)
      setSelectedMsoa(null)
      return
    }

    if (msoa) {
      setSelectedMsoa(msoa)
      setSelectedStation(null)
    }
  }

  //error and loading states
  if (error) return <p style={{ color: '#dc2626' }}>{error}</p>
  if (!linesForMap || !stationsData || !distanceForMap) return <p>Loading map...</p>

  return (
    //map container
    <div style={{ width: '100%', height: '72vh', border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
      <Map
        initialViewState={{ longitude: -0.1276, latitude: 51.5072, zoom: 9.8 }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        style={{ width: '100%', height: '100%' }}
        onClick={handleClick}
        interactiveLayerIds={['msoa-fill', 'stations-layer']}
      >
        {/*bottom MSOA choropleth layer*/}
        <Source id="msoa-source" type="geojson" data={distanceForMap}>
          <Layer {...msoaFillLayer} />
          <Layer {...msoaLineLayer} />
        </Source>

        {/*middlee tube line layer*/}
        <Source id="tfl-lines" type="geojson" data={linesForMap}>
          <Layer {...lineCasingLayer} />
          <Layer {...lineLayer} />
        </Source>

        {/*top station points layer */}
        <Source id="tfl-stations" type="geojson" data={stationsData}>
          <Layer {...stationLayer} />
        </Source>

        {/*popups for station and MSOA*/}
        <MapPopups
          selectedStation={selectedStation}
          setSelectedStation={setSelectedStation}
          selectedMsoa={selectedMsoa}
          setSelectedMsoa={setSelectedMsoa}
        />
      </Map>

      {/*control button at upper left and button for data resources at right bottom*/}
      <MapControls
        showMsoa={showMsoa}
        setShowMsoa={setShowMsoa}
        distanceMetric={distanceMetric}
        setDistanceMetric={setDistanceMetric}
        showSources={showSources}
        setShowSources={setShowSources}
      />

      {/*legend components*/}
      <DistanceLegend metric={distanceMetric} />
      <MapLegend lineColors={LINE_COLORS} />
    </div>
  )
}
