"use client"
import moment from 'moment';
import React from 'react'
import { BiFootball } from 'react-icons/bi'
import { GiBorderedShield, GiRosaShield } from 'react-icons/gi'
import { motion } from "framer-motion";

type Props = {
   row:any;
   index: number
}

function FixturePill({ row,index }: Props) {
    const animate = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            delay: index-0.5
          }
          
        }
    };
    const group = row?.group.name;
    const homeTeam = row?.teams[0]?.name;
    const awayTeam = row?.teams[1]?.name;
    const homeGoals = row.scorers?.split(":")[0];
    const awayGoals = row.scorers?.split(":")[1];
    const kicktime = moment(row.kickoff).format("H:mm")
    const kickdate = moment(row.kickoff).format("MMM DD")
    
  return (
    <motion.div initial="hidden" animate="visible" variants={animate} className={`${row.kickstatus == 'live' ? 'bg-green-100 animate-pulse': row.kickstatus == 'scheduled' ? 'bg-red-50': 'bg-slate-100'} relative overflow-hidden p-2 md:p-4 w-full rounded border flex flex-col md:flex-row items-center justify-start md:justify-center space-y-2 md:space-y-0 md:space-x-5`}>
        
        <div className={`absolute top-0 left-0 py-0.5 h-full w-4 flex md:hidden items-center justify-center ${row.kickstatus == 'live' ? 'bg-green-800' : row.kickstatus == 'scheduled' ? 'bg-gray-600' : 'bg-blue-900' }`}>
            <div className="-rotate-90 text-[0.48rem] font-bold text-white uppercase tracking-wider">{row.kickstatus}</div>
        </div>
        <div className={`absolute -top-2.5 md:-top-1 right-1 md:-left-1 px-2 py-0.5 md:py-1 h-5 w-fit items-center justify-center rounded-b-md border bg-slate-200`}>
            <div className="text-[0.6rem] font-bold text-slate-500 uppercase tracking-wider">{group}</div>
        </div>

        <div className="w-full md:flex-1 flex md:items-center justify-start md:justify-between space-x-7 text-xs">
            <div className="hidden md:flex"><BiFootball className="h-6 w-6 " /></div>
            <div className="w-16 font-medium italic">
                <span>{kicktime}</span><br/><span className="font-bold text-[0.75em] not-italic uppercase">{kickdate}</span>
            </div>
            <div className="w-full flex flex-col space-y-1 ">
                <div className="flex items-center justify-between space-x-7">
                    <div className="flex items-center space-x-2">
                        <GiBorderedShield />
                        <span className="font-semibold">{homeTeam}</span>
                    </div>
                    <span className={`flex md:hidden ${row.kickstatus == 'scheduled' ? 'font-medium text-gray-600': 'font-black text-red-900'}`}>{row.kickstatus == 'scheduled' ? '-' : homeGoals }</span>
                </div>
                <div className="flex items-center justify-between space-x-7">
                    <div className="flex items-center space-x-2">
                        <GiRosaShield />
                        <span className="font-semibold">{awayTeam}</span>
                    </div>
                    <span className={`flex md:hidden ${row.kickstatus == 'scheduled' ? 'font-medium text-gray-600': 'font-black text-red-900'}`}>{row.kickstatus == 'scheduled' ? '-' : awayGoals }</span>
                </div>
            </div>
        </div>
        <div className="hidden md:flex px-1.5 py-0.5 text-[0.6em] bg-white text-gray-400 font-semibold uppercase border border-gray-400 rounded-md tracking-wider">{row.kickstatus}</div>
        <div className="w-fit hidden md:flex justify-end text-xs">
            <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                    <span className={`hidden md:flex ${row.kickstatus == 'scheduled' ? 'font-medium text-gray-600': 'font-black text-red-900'}`}>{row.kickstatus == 'scheduled' ? '-' : homeGoals }</span>
                </div>
                <div className="flex items-center space-x-2">
                <span className={`hidden md:flex ${row.kickstatus == 'scheduled' ? 'font-medium text-gray-600': 'font-black text-red-900'}`}>{row.kickstatus == 'scheduled' ? '-' : awayGoals }</span>
                </div>
            </div>
        </div>
    </motion.div>
  )
}

export default FixturePill