"use client"
import moment from 'moment';
import React from 'react'
import { BiFootball } from 'react-icons/bi'
import { GiBorderedShield, GiRibbonShield, GiRosaShield, GiSlashedShield } from 'react-icons/gi'
import { motion } from "framer-motion";
import { FcManager } from 'react-icons/fc';
import Image from 'next/image';
import Logo from '@/public/eagle.png'

type Props = {
   row:any;
   index: number
}

function MainTeamPill({ row,index }: Props) {
    const animate = {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            delay: index-0.9
          }
          
        }
    };

    const form = row.teamRecentForm?.split('');

  return (
    <motion.div initial="hidden" animate="visible" variants={animate} className={`bg-slate-100 relative overflow-hidden p-2 md:p-4 w-full rounded border flex flex-col md:flex-row items-center justify-start md:justify-center space-y-2 md:space-y-0 md:space-x-5`}>
        
        <div className={`absolute top-0 left-0 py-0.5 h-full w-2 flex md:hidden items-center justify-center bg-gray-400`}>
            {/* <div className="-rotate-90 text-[0.48rem] font-bold text-white uppercase tracking-wider">GROUP A</div> */}
        </div>
        { row.teamRecentForm ? 
        (<div className={`absolute -top-2.5 md:-top-1 right-1 md:right-4 px-1 py-0.5 md:py-1 h-5 w-fit items-center justify-center rounded-b-md border bg-slate-200 overflow-hidden`}>
            <div className="text-[0.6rem] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-center space-x-0.5">
               { form.map((row: any) => {
                 if(row == 'W') return (<span className="px-0.5 bg-green-700 text-white">W</span>);
                 if(row == 'D') return (<span className="px-1 py-0 bg-yellow-400 text-white">D</span>);
                 if(row == 'L') return (<span className="px-1 py-0 bg-red-500 text-white">L</span>);
               })}
            </div>
        </div>
        ): null }

        <div className="w-full md:flex-1 flex md:items-center justify-start md:justify-between space-x-7 text-xs">
            <div className="hidden md:flex"><BiFootball className="h-7 w-7 " /></div>
            {/* <div className="w-16 font-medium italic">
                <span>TEST</span><br/><span className="font-bold text-[0.75em] not-italic uppercase">23</span>
            </div> */}
            <div className="w-full flex flex-col space-y-1 ">
                <div className="flex items-center justify-between space-x-7">
                    <div className="flex items-center space-x-2">
                        <GiSlashedShield className="h-6 w-6" />
                        <span className="font-semibold text-base">{row.name?.toUpperCase()}</span>
                    </div>
                </div>
                { row.coachName ? 
                (<div className="flex items-center justify-between space-x-7">
                    <div className="flex items-center space-x-2">
                        <div className="relative h-5 w-5">
                            <Image className="object-cover" src={Logo} alt="" fill/>
                        </div>
                        <FcManager className="h-5 w-5" />
                        <span className="font-semibold">{row.coachName.toUpperCase()}</span>
                    </div>
                </div>
                ): null }
            </div>
        </div>
        <div className="hidden md:flex px-1.5 py-0.5 text-[0.6em] bg-white text-gray-400 font-semibold uppercase border border-gray-400 rounded-md tracking-wider">FORM</div>
    </motion.div>
  )
}

export default MainTeamPill