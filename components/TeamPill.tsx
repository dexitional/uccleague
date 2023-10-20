import Link from 'next/link';
import React from 'react'
import { BiGroup } from 'react-icons/bi'
import { FcConferenceCall } from 'react-icons/fc';

type Props = {
    row: any;
}

function TeamPill({ row }: Props) {
  return (
    <Link href={`/teams/${row.nickname?.toLowerCase()}`} key={row.$id} className="flex items-center space-x-1">
        <FcConferenceCall className="w-5 h-5" />
        <span className="text-xs font-semibold uppercase">{row.name}</span>
    </Link>
  )
}

export default TeamPill