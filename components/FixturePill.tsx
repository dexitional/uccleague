import moment from 'moment';
import React from 'react'
import { BiFootball } from 'react-icons/bi'
import { GiBorderedShield, GiRosaShield } from 'react-icons/gi'

type Props = {
   row:any;
}

function FixturePill({ row }: Props) {
   
    const homeTeam = row?.teams[0]?.name;
    const awayTeam = row?.teams[1]?.name;
    const homeGoals = row.scorers?.split(":")[0];
    const awayGoals = row.scorers?.split(":")[1];
    const kicktime = moment(row.kickoff).format("H:mm")
    const kickdate = moment(row.kickoff).format("MMM DD")


  return (
    <div className="relative overflow-hidden p-4 w-full rounded border bg-slate-100 flex flex-col md:flex-row items-center md:justify-center space-y-3 md:space-y-0 md:space-x-5">
        <div className="absolute top-0 left-0 py-0.5 h-full w-4 flex md:hidden items-center justify-center bg-blue-900">
            <div className="-rotate-90 text-[0.6em] font-bold text-white uppercase tracking-wider">{row.kickstatus}</div>
        </div>
        <div className="md:flex-3 flex md:items-center space-x-7 text-xs">
            <BiFootball className="h-6 w-6 hidden md:flex" />
            <span className="font-medium italic">
                <span>{kicktime}</span><br/><span className="font-bold text-[0.75em] not-italic uppercase">{kickdate}</span>
            </span>
            <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between space-x-10">
                    <div className="flex items-center space-x-2">
                        <GiBorderedShield />
                        <span className="font-semibold">{homeTeam}</span>
                    </div>
                    <span className={`flex md:hidden ${row.kickstatus == 'scheduled' ? 'font-medium text-gray-600': 'font-black text-red-900'}`}>{row.kickstatus == 'scheduled' ? '-' : homeGoals }</span>
                </div>
                <div className="flex items-center justify-between space-x-10">
                    <div className="flex items-center space-x-2">
                        <GiRosaShield />
                        <span className="font-semibold">{awayTeam}</span>
                    </div>
                    <span className={`flex md:hidden ${row.kickstatus == 'scheduled' ? 'font-medium text-gray-600': 'font-black text-red-900'}`}>{row.kickstatus == 'scheduled' ? '-' : awayGoals }</span>
                </div>
            </div>
        </div>
        <div className="hidden md:flex px-1.5 py-0.5 text-[0.6em] text-gray-400 font-semibold uppercase border border-gray-400 rounded-sm">{row.kickstatus}</div>
        <div className="flex-1 flex justify-end text-xs">
            <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                    <span className={`hidden md:flex ${row.kickstatus == 'scheduled' ? 'font-medium text-gray-600': 'font-black text-red-900'}`}>{row.kickstatus == 'scheduled' ? '-' : homeGoals }</span>
                </div>
                <div className="flex items-center space-x-2">
                <span className={`hidden md:flex ${row.kickstatus == 'scheduled' ? 'font-medium text-gray-600': 'font-black text-red-900'}`}>{row.kickstatus == 'scheduled' ? '-' : awayGoals }</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FixturePill