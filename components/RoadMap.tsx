'use client'
import React from 'react'
import StageFixtureCard from './StageFixtureCard'
import { GiDiamondTrophy } from 'react-icons/gi';
import Confetti from 'react-confetti'

type Props = {
    data: any
}

function RoadMap({ data }: Props) {
  // QuaterFinal
  const q1 = data.get('q1');
  const q2 = data.get('q2');
  const q3 = data.get('q3');
  const q4 = data.get('q4');
  // Semifinal
  const s1 = data.get('s1');
  const s2 = data.get('s2');
  // Finals
  const f = data.get('f');
  const tf = data.get('tf');
  
  const winTeam = f?.teams?.find((team: any) => team.$id == f?.matchWinner)
  console.log(winTeam)
  
  return (
    <div className="z-20 m-0 sticky top-9 md:top-12">
        <h1 className="block md:hidden ml-3 px-4 py-1 w-fit bg-slate-200 text-sm text-gray-500 font-extrabold tracking-widest rounded-t-md font-sans">ROAD TO FINAL</h1>
        <div className="overflow-x-auto md:overflow-visible bg-slate-50 border rounded-lg shadow  ">
            <div className="relative py-10 px-2 h-[26rem] flex items-center space-x-6 md:overflow-hidden">
                { f?.kickstatus == 'finished' ? <Confetti width={600} height={600} /> : null }
                <h1 className="hidden md:block absolute top-0 -right-2 px-4 py-1 w-fit bg-red-100 text-sm text-gray-500 border border-slate-300 font-extrabold tracking-widest rounded-b-md font-sans">ROAD TO FINAL</h1>
                {/* Quaters  */}
                <div className="relative h-full flex flex-col justify-between space-y-1 ">
                    <StageFixtureCard data={q1} />
                    <StageFixtureCard data={q4} />
                    <StageFixtureCard data={q2} />
                    <StageFixtureCard data={q3} />
                </div>
                {/* Semis */}
                <div className="relative h-[16.8rem] flex flex-col justify-between space-y-1 ">
                    <div className="z-10 absolute -top-[0.15rem] -left-16 h-20 w-20 border-l-0 border-t-2 border-r-2 border-red-400 rotate-45"></div>
                    <div className="z-10 absolute -bottom-[0.5rem] -left-16 h-20 w-20 border-l-0 border-t-2 border-r-2 border-red-400 rotate-45"></div>
                    <StageFixtureCard data={s1} />
                    <StageFixtureCard data={s2} />
                </div>
                {/* Finals */}
                <div className="relative h-16 flex flex-col justify-between space-y-1 ">
                    <div className="z-10 absolute -top-7 -left-28 h-32 w-32 border-l-0 border-t-2 border-r-2 border-red-400 rotate-45"></div>
                    <div className="z-10 absolute -top-24 left-1/2 -translate-x-1/2 ">
                        <GiDiamondTrophy className={`w-24 h-24 text-blue-950 ${f?.kickstatus == 'finished' && 'animate-bounce'}`} />
                    </div>
                    <StageFixtureCard data={f} />
                    <div className="relative top-20">
                        { f?.kickstatus == 'finished' ? 
                            <div className="px-2 py-1 absolute -top-36 -left-52 h-16 w-44 skew-x-12 bg-red-50 border-2 border-blue-950 animate-bounce rounded-xl flex flex-col space-y-1">
                                <h1 className="text-sm text-center text-gray-600 font-extrabold tracking-widest">CHAMPIONS</h1>
                                <div className="flex items-center justify-center space-x-3">
                                    <GiDiamondTrophy className="w-6 h-6 text-blue-950" />
                                    <span className="flex-1 truncate font-bold text-sm text-blue-950">{winTeam?.name}</span>
                                </div>
                            </div> : null
                        }


                        <div className="absolute -top-24 left-1/2 h-24 w-1.5 bg-slate-300"></div>
                        <div className="absolute -top-5 left-4 py-0.5 h-6 w-40 bg-blue-950/90 text-white rounded-t-md font-semibold text-center text-[0.65rem] tracking-widest ">THIRD & FOURTH</div>
                        <StageFixtureCard data={tf} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RoadMap