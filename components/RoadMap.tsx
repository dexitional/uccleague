import React from 'react'
import StageFixtureCard from './StageFixtureCard'
import { GiDiamondTrophy } from 'react-icons/gi';

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
  
  return (
    <div className="z-20 m-0 sticky top-9 md:top-12">
        <h1 className="block md:hidden ml-3 px-4 py-1 w-fit bg-slate-200 text-sm text-gray-500 font-extrabold tracking-widest rounded-t-md font-sans">ROAD TO FINAL</h1>
        <div className="overflow-x-auto md:overflow-visible bg-slate-50 border rounded-lg shadow  ">
            <div className="relative py-10 px-2 h-[26rem] flex items-center space-x-6 md:overflow-hidden">
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
                        <GiDiamondTrophy className="w-24 h-24 text-blue-950" />
                    </div>
                    <StageFixtureCard data={f} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default RoadMap