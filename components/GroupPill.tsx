import React from 'react'

type Props = {
    title: string;
    data?: any;
}

function GroupPill({ title, data }: Props) {
  return (
 <div className="p-4 bg-white/70 space-y-3 rounded-lg shadow">
    <h1 className="font-bold text-sm text-red-800">{title}</h1>
    <div className="p-2 w-full rounded-lg bg-white text-xs space-y-2">
      <div className="">
        <div className="p-1 font-extrabold grid grid-cols-7 text-red-800">
          <div className="col-span-1">#</div>
          <div className="col-span-4">TEAM</div>
          <div className="col-span-1">GD</div>
          <div className="col-span-1">PTS</div>
        </div>
      </div>
      <div className="font-medium">
        { data?.map((row:any, i:any) => (
        <div key={row.$id} className="p-1 grid grid-cols-7">
          <div className="col-span-1">{i+1}</div>
          <div className="col-span-4 font-semibold">{row.team}</div>
          <div className="col-span-1">{row.goalDifference}</div>
          <div className="col-span-1 font-black">{row.points}</div>
        </div>
       ))}
      </div>
    </div>
 </div>
  )
}

export default GroupPill