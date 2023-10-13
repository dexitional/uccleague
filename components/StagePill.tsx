import React from 'react'
import { BiGroup } from 'react-icons/bi'
import { FcList } from 'react-icons/fc';
import { GrAchievement } from 'react-icons/gr'

type Props = {
    row: any;
}

function StagePill({ row }: Props) {
  return (
    <div key={row.$id} className="flex items-center space-x-1">
        <GrAchievement className="w-5 h-5" />
        <span className="text-xs font-semibold uppercase">{row.name}</span>
    </div>
  )
}

export default StagePill