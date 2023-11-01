import React from 'react'
import { GiBorderedShield, GiRosaShield } from 'react-icons/gi'

type Props = { 
    data: any
}

function StageFixtureCard({ data }: Props) {
  
  return (
    <div className={`z-20 relative py-1 px-2.5 h-16 w-48 flex flex-col items-center justify-center space-y-1 bg-white rounded-md text-xs border ${data?.kickstatus == 'finished' ? 'border-red-200': 'border-slate-300' }`}>
        { data?.slot && <div className={`z-10 px-1 py-0.5 absolute top-1/2 -translate-y-1/2 -left-5 rounded-sm text-xs font-bold  ${data?.kickstatus == 'finished' ? 'bg-red-600 text-white': 'bg-slate-300 text-gray-600' }`}>{data?.slot?.toUpperCase() || 'P'}</div> }
        {/* Home */}
        <div className="w-full flex items-center justify-between space-x-2">
            <div className="flex-1 flex items-center space-x-1.5">
                <GiBorderedShield />
                <div className={`w-[7.5rem] flex-1 truncate ${data?.matchWinner == data?.teams[0]?.$id ? 'font-extrabold animate-pulse':'font-normal'} ${!data?.teams[0]?.name && 'text-gray-300'}`}>{data?.teams[0]?.name || <span className="font-normal text-[0.65rem]">-- WINNER SLOT --</span>}</div>
            </div>
            {/* <div className={`text-xs font-sans ${data?.matchWinner == data?.teams[0]?.$id ? 'font-extrabold':'font-normal'} ${(!data?.scorers || data?.kickstatus != 'finished') && 'text-gray-300'}`}>{data?.kickstatus == 'finished' && data?.scorers?.split(":")[0] || '-'} (0)</div> */}
            <div className={`text-xs font-sans flex items-center space-x-0.5 ${data?.matchWinner == data?.teams[0]?.$id ? 'font-extrabold':'font-normal'} ${(!data?.scorers || data?.kickstatus != 'finished') && 'text-gray-300'}`}>
                <span>{data?.kickstatus == 'finished' && data?.scorers?.split(":")[0] || '-'}</span>
                { data?.afterPenaltyScore && <span className="font-normal text-gray-400">({data?.afterPenaltyScore?.split(":")[0]})</span> }
            </div>
        </div>
        {/* Away */}
        <div className="w-full flex items-center justify-between space-x-2">
            <div className="flex-1 flex items-center space-x-1.5">
                <GiRosaShield />
                <div className={`w-[7.5rem] flex-1 truncate ${data?.matchWinner == data?.teams[1]?.$id ? 'font-extrabold animate-pulse':'font-normal'} ${!data?.teams[1]?.name && 'text-gray-300'}`}>{data?.teams[1]?.name || <span className="font-normal text-[0.65rem]">-- WINNER SLOT --</span>}</div>
            </div>
            <div className={`text-xs font-sans flex items-center space-x-0.5 ${data?.matchWinner == data?.teams[1]?.$id ? 'font-extrabold':'font-normal'} ${(!data?.scorers || data?.kickstatus != 'finished') && 'text-gray-300'}`}>
                <span>{data?.kickstatus == 'finished' && data?.scorers?.split(":")[1] || '-'}</span>
                { data?.afterPenaltyScore && <span className="font-normal text-gray-400">({data?.afterPenaltyScore?.split(":")[1]})</span> }
            </div>
        </div>
    </div>
  )
}

export default StageFixtureCard