import React from 'react'
import { GiBorderedShield } from 'react-icons/gi'

type Props = {}

function LiveHomeCard({}: Props) {
  return (
    <div className="p-1 py-2 md:p-2 flex-1 flex flex-col md:flex-row items-center md:space-x-2 space-y-2 md:space-y-0  min-h-fit border border-gray-300 rounded-md bg-white/70">
               <div className="h-10 w-10 md:h-16 md:w-16 bg-blue-50 md:rounded-xl flex items-center justify-center shadow-md">
                 <GiBorderedShield className="w-6 h-6 md:w-10 md:h-10" />
               </div>
               {/* <div>WWWWWW</div> */}
                <div className="w-full md:w-[65%] flex flex-col items-center justify-center space-y-2 md:space-y-1">
                    <div className="w-full text-[0.8rem] font-bold text-gray-600 font-sans truncate">VALCO/CASFORD/ATL</div>
                    <div className={`px-1 py-0.5 md:py-1 w-fit flex items-center justify-center rounded border bg-blue-50/60 overflow-hidden`}>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-center space-x-0.5">
                            <span className="px-0.5 bg-green-700 text-white rounded">W</span>
                            <span className="px-1 py-0 bg-yellow-400 text-white rounded">D</span>
                            <span className="px-1 py-0 bg-red-600 text-white rounded">L</span>
                        </div>
                    </div>
                </div>
                {/* ): null } */}
            </div>
  )
}

export default LiveHomeCard