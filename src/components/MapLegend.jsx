import { useState } from 'react'

export default function MapLegend({ lineColors }) {
  //legend folded/expanded state
  const [collapsed, setCollapsed] = useState(false)
  //convert color mapping object to array entries for iteration
  const entries = Object.entries(lineColors)

  return (
    //tube legend at top right
    <div
      style={{
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 999,
        width: 170,
        maxHeight: '45vh',
        overflowY: 'auto',
        background: 'rgba(255,255,255,0.98)',
        border: '1px solid #d1d5db',
        borderRadius: 8,
        padding: 8,
        fontSize: 11,
        lineHeight: 1.25,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        pointerEvents: 'auto',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: collapsed ? 0 : 10 }}>
        <div style={{ fontWeight: 700, fontSize: 13 }}>Tube Lines</div>
        <button
          onClick={() => setCollapsed((v) => !v)}
          style={{
            border: '1px solid #d1d5db',
            borderRadius: 4,
            background: '#fff',
            fontSize: 11,
            padding: '2px 6px',
            cursor: 'pointer',
          }}
          aria-label={collapsed ? 'open' : 'close'}
          title={collapsed ? 'open' : 'close'}
        >
          {collapsed ? 'open' : 'close'}
        </button>
      </div>

      {/*when open the legend show all lines*/}
      {!collapsed &&
        entries.map(([name, color]) => (
          <div
            key={name}
            style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, minHeight: 20 }}
          >
            <span
              style={{
                width: 16,
                height: 4,
                borderRadius: 2,
                background: color,
                display: 'inline-block',
                border: '1px solid #9ca3af',
                flexShrink: 0,
              }}
            />
            <span style={{ wordWrap: 'break-word' }}>{name}</span>
          </div>
        ))}
    </div>
  )
}
