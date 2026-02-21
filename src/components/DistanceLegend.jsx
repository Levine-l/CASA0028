export default function DistanceLegend({ metric = 'ratio5' }) {
  //select color classes based on the current metric
  const items =
    metric === 'ratio5'
      ? [
          { color: '#f7fbff', label: '< 5%' },
          { color: '#deebf7', label: '5 - 10%' },
          { color: '#c6dbef', label: '10 - 20%' },
          { color: '#9ecae1', label: '20 - 30%' },
          { color: '#6baed6', label: '30 - 40%' },
          { color: '#3182bd', label: '40%+' },
        ]
      : [
          { color: '#f7fbff', label: '< 5 km' },
          { color: '#deebf7', label: '5 - 8 km' },
          { color: '#c6dbef', label: '8 - 12 km' },
          { color: '#9ecae1', label: '12 - 16 km' },
          { color: '#6baed6', label: '16 - 20 km' },
          { color: '#3182bd', label: '20 km+' },
        ]

  //title change with selected metric
  const title =
    metric === 'ratio5'
      ? 'Distance of commuters over 5km (%)'
      : 'Average commute distance (km)'

  return (
    //legend at bottom left
    <div
      style={{
        position: 'absolute',
        left: 10,
        bottom: 10,
        zIndex: 1000,
        background: 'rgba(255,255,255,0.95)',
        border: '1px solid #d1d5db',
        borderRadius: 6,
        padding: '8px 10px',
        fontSize: 11,
        lineHeight: 1.3,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '14px auto', gap: '4px 8px' }}>
        {items.map((item) => (
          <div key={item.label} style={{ display: 'contents' }}>
            <span style={{ background: item.color, border: '1px solid #cbd5e1' }} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
