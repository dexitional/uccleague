import React from 'react'

function Pitch({children}: { children:React.ReactNode }) {
  return (
    <div className="p-3 relative w-full md:w-3/5  aspect-[16/9]  bg-slate-100 rounded border-2 border-gray-200">
        <div className="absolute top-0 left-0 w-1/2 h-full border-r-2"></div>

        <div className="absolute top-[18%] left-0 w-1/5 h-3/5 border-l-0 border-2"></div>
        <div className="absolute top-[18%] right-0 w-1/5 h-3/5 border-r-0 border-2"></div>

        <div className="absolute top-[28%] left-0 w-[10%] h-[40%] border-l-0 border-2"></div>
        <div className="absolute top-[28%] right-0 w-[10%] h-[40%] border-r-0 border-2"></div>
        {/* <div className="absolute top-0 left-0 w-1/2 h-full border-l-2"></div> */}
        {children}
    </div>
  )
}

export default Pitch