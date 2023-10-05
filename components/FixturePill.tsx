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
    <div key={row.$id} className="p-4 w-full rounded border bg-slate-100 flex items-center justify-center">
        <div className="flex-2 flex items-center space-x-7 text-xs">
        <BiFootball className="h-6 w-6" />
        <span className="font-medium italic">
            <span>{kicktime}</span><br/><span className="font-bold text-[0.75em] not-italic uppercase">{kickdate}</span>
        </span>
        <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
                <GiBorderedShield />
                <span className="font-semibold">{homeTeam}</span>
            </div>
            <div className="flex items-center space-x-2">
                <GiRosaShield />
                <span className="font-semibold">{awayTeam}</span>
            </div>
        </div>
        </div>
        <div className="flex-1 flex justify-end text-xs text-red-900">
        <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
            <span className="font-black">{homeGoals}</span>
            </div>
            <div className="flex items-center space-x-2">
            <span className="font-black">{awayGoals}</span>
            </div>
        </div>
        </div>
    </div>
  )
}

export default FixturePill