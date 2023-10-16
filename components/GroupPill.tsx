"use client"
import React from 'react'
import { motion } from "framer-motion";

type Props = {
    title: string;
    data?: any;
    index: number
}

function GroupPill({ title, data, index }: Props) {
  const animate = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          delay: index/Math.exp(0.5),
          delayChildren: 0.5,
          staggerChildren: 0.5
        }
      }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible:{y: 0  ,opacity: 1  }
  };

  return (
 <motion.div initial="hidden" animate="visible" variants={animate} className="p-4 bg-white/70 space-y-3 rounded-lg shadow">
    <h1 className="font-bold text-sm text-red-800">{title}</h1>
    <div className="p-2 w-full rounded-lg bg-white text-[0.65rem] space-y-2">
      <div className="">
        <div className="p-1 font-extrabold grid grid-cols-8 text-red-800">
          <div className="col-span-1">#</div>
          <div className="col-span-4">TEAM</div>
          <div className="col-span-1">MP</div>
          <div className="col-span-1 text-center">GD</div>
          <div className="col-span-1">PTS</div>
        </div>
      </div>
      <div className="font-medium">
        { data?.map((row:any, i:any) => (
        <motion.div variants={item} key={row.$id} className={`px-2 py-1 grid grid-cols-8 ${ i == 0 ? 'bg-blue-50': i == 1 ? 'bg-slate-50': ''}`}>
          <div className={`col-span-1 ${ i == 0 || i == 1 ? 'text-blue-950 font-black' : ''}`}>{i+1}</div>
          <div className="col-span-4 font-bold text-gray-600">{row.team}</div>
          <div className="col-span-1">{row.matches}</div>
          <div className="col-span-1 text-center">{row.goalDifference}</div>
          <div className="col-span-1 font-black">{row.points}</div>
        </motion.div>
       ))}
      </div>
    </div>
 </motion.div>
  )
}

export default GroupPill