export default function MapControls({
  showMsoa,
  setShowMsoa,
  distanceMetric,
  setDistanceMetric,
  showSources,
  setShowSources,
}) {
  return (
    <>
      {/*button to show the choropleth map layer*/}
      <button
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation()
          setShowMsoa((v) => !v)
        }}
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 1000,
          padding: '6px 10px',
          borderRadius: 6,
          border: '1px solid #d1d5db',
          background: '#fff',
          fontSize: 12,
          cursor: 'pointer',
        }}
      >
        {showMsoa ? 'Hide Choropleth Map' : 'Show Choropleth Map'}
      </button>

      {/*button that change between ratio and avg to work metrics*/}
      <button
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation()
          setDistanceMetric((v) => (v === 'ratio5' ? 'avgKm' : 'ratio5'))
        }}
        style={{
          position: 'absolute',
          top: 48,
          left: 10,
          zIndex: 1000,
          padding: '6px 10px',
          borderRadius: 6,
          border: '1px solid #d1d5db',
          background: '#fff',
          fontSize: 12,
          cursor: 'pointer',
        }}
      >
        {distanceMetric === 'ratio5' ? 'Ratio 5km+' : 'Avg DisToWork'}
      </button>

      {/*the data sources panel at bottom right*/}
      <div
        style={{
          position: 'absolute',
          right: 10,
          bottom: 30,
          zIndex: 1000,
          background: 'rgba(255,255,255,0.95)',
          border: '1px solid #d1d5db',
          borderRadius: 6,
          padding: showSources ? '10px 12px' : '6px 8px',
          fontSize: 11,
          lineHeight: 1.35,
          maxWidth: showSources ? 380 : 260,
        }}
      >
        {/* button to show and close the data sources panel */}
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation()
            setShowSources((v) => !v)
          }}
          style={{
            border: '1px solid #d1d5db',
            borderRadius: 4,
            background: '#fff',
            fontSize: 11,
            padding: '2px 6px',
            cursor: 'pointer',
            marginBottom: showSources ? 6 : 0,
          }}
        >
          {showSources ? 'Hide sources' : 'Show sources'}
        </button>

        {/*data sources info*/}
        {showSources && (
          <div style={{ color: '#374151' }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Data sources</div>
            <div>• Tube lines & stations: https://github.com/oobrien/vis/tree/master/tubecreature/data</div>
            <div>• Census 2021 Distance travelled to work: https://www.nomisweb.co.uk/sources/census_2021_bulk</div>
            <div>• MSOA boundaries for join purpose: https://data.london.gov.uk/dataset/statistical-gis-boundary-files-for-london-20od9/</div>
            <div>• Visualisation library: Chart.js</div>
          </div>
        )}
      </div>
    </>
  )
}
