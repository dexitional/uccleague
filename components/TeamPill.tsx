import React from 'react'
import { BiGroup } from 'react-icons/bi'

type Props = {
    row: any;
}

function TeamPill({ row }: Props) {
  return (
    <div className="flex items-center space-x-1">
        <BiGroup className="w-5 h-5" />
        <span className="text-xs font-semibold uppercase">{row.name}</span>
    </div>
  )
}

export default TeamPill