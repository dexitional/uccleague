import moment from 'moment';
import Image from 'next/image';
import React from 'react'
import { BiFootball } from 'react-icons/bi'
import { GiBorderedShield, GiRosaShield } from 'react-icons/gi'

type Props = {
   row:any;
}

function SquadPill({ row }: Props) {
   return (
    <div className="relative overflow-hidden p-2 md:px-4 md:py-1 w-full rounded border bg-slate-100 flex flex-col md:flex-row items-center justify-start md:justify-center space-y-2 md:space-y-0 md:space-x-5">
        <div className={`absolute top-0 left-0 py-0.5 h-full w-4 flex md:hidden items-center justify-center ${row.role == 'attacker' ? 'bg-green-800' : row.role == 'midfielder' ? 'bg-gray-600' : 'bg-blue-900' }`}>
            <div className="-rotate-90 text-[0.48rem] font-bold text-white uppercase tracking-wider">{row.role}</div>
        </div>
        <div className={`absolute -top-2.5 md:-top-1 right-1 md:-left-6 px-2 py-0.5 md:py-1 h-5 w-fit items-center justify-center rounded-b-md border bg-slate-200`}>
            <div className="text-[0.6rem] font-bold text-slate-500 uppercase tracking-wider">{row.staffNo}</div>
        </div>

        <div className="ml-3 md:pl-3 flex-1 md:flex-1 flex md:items-center justify-start md:justify-between space-x-7 text-xs">
            {/* Image */}
            <div className="w-full flex flex-col space-y-1 ">
                <div className="w-full flex items-center justify-between space-x-7">
                    <div className="py-0.5 flex items-center space-x-2">
                        {/* <GiBorderedShield /> */}
                        <div className="relative h-10 w-10 rounded-full overflow-hidden bg-white border-2">
                            <Image className="object-contain rounded-md" src={`https://ehub.ucc.edu.gh/api/photos/?tag=${row.staffNo}`} alt={row.firstName} fill />
                        </div>
                        <span className="font-semibold text-slate-500">{row.lastName?.toUpperCase()}, {row.firstName?.toUpperCase()}</span>
                    </div>
                    <div className={`px-2 py-1 flex md:hidden font-bold bg-white text-sm text-gray-400 border-2 border-gray-400 rounded-lg`}>{row.kitNo}</div>
                </div>
            </div>
        </div>
        <div className="hidden md:flex px-1.5 py-0.5 text-[0.6em] bg-white text-gray-400 font-semibold uppercase border border-gray-400 rounded-md tracking-wider">{row.role}</div>
        <div className="w-fit hidden md:flex justify-end text-base">
            <div className={`px-2 font-bold bg-white text-gray-400 border-2 border-gray-400 rounded-lg`}>{row.kitNo}</div>
        </div>
    </div>
  )
}

export default SquadPill