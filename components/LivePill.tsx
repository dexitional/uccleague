import React from 'react'
import { GiBorderedShield } from 'react-icons/gi'
import LiveHomeCard from './LiveHomeCard'
import LiveAwayCard from './LiveAwayCard'

type Props = {
  data: any
}

function LivePill({ data }: Props) {
  
  return (
    <div className="px-2 py-3 md:px-4 md:py-4 relative w-full space-y-2 backdrop-blur-md bg-green-50/30 rounded-md border border-slate-200 shadow overflow-hidden">
        <h3 className="px-1 md:px-1.5 py-0 absolute top-0 left-0 w-fit rounded-br-md bg-red-600 text-[0.65rem] md:text-sm text-white font-bold tracking-wider animate-pulse">LIVE</h3>
        <div className="w-full md:mt-10 space-y-2">
            <div className="relative h-full w-full flex items-center justify-between space-x-2">
                <div className="px-1 md:px-1.5 py-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center -skew-x-6 rounded-sm bg-red-500 font-bold text-[0.6rem] md:text-[0.8rem] text-white">VS</div>
                <LiveHomeCard data={data} />
                <LiveAwayCard data={data} />
                {/* <div className="flex-1 min-h-fit border border-gray-400 rounded-md">Away</div> */}
            </div>
        </div>
  </div>
  )
}

export default LivePill