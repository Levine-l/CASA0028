export default function YearRangeSelect(props) {

  function handleChange(e) {
    if (e.target.id === 'start-year') {
      const newStartYear = e.target.value
      const newYearRange = {'min': newStartYear, 'max': props.yearRange.max}
      props.setYearRange(newYearRange)
    }
    if (e.target.id === 'end-year') {
      const newEndYear = e.target.value
      const newYearRange = {'min': props.yearRange.min, 'max': newEndYear}
      props.setYearRange(newYearRange)
    }
  }

  return (
    <div className="w-full flex items-center justify-center gap-4 mt-4">
        <div>
            <label htmlFor="start-year" className="sr-only">Start Year</label>

            <div className="flex items-center gap-1">
                <span className="text-sm text-gray-700">Start Year:</span>

                <input 
                    type="number" 
                    id="start-year" 
                    value={props.yearRange.min} 
                    className="h-10 w-24 rounded-sm border-gray-200 sm:text-sm" 
                    onChange={handleChange}
                />
            </div>
        </div>
        <div>
            <label htmlFor="end-year" className="sr-only">End Year</label>

            <div className="flex items-center gap-1">
                <span className="text-sm text-gray-700">End Year:</span>

                <input 
                    type="number" 
                    id="end-year" 
                    value={props.yearRange.max} 
                    className="h-10 w-24 rounded-sm border-gray-200 sm:text-sm" 
                    onChange={handleChange}
                />
            </div>
        </div>
    </div>
  )
}