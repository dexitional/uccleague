import Link from 'next/link';
import React from 'react'
// import { GrAchievement } from 'react-icons/gr'
import { FcPhoneAndroid } from 'react-icons/fc'

type Props = {
    row: any;
}

function OfficialPill({ row }: Props) {
  return (
    <Link href={`/official/${row.slug}`} key={row.slug} className="flex items-center space-x-1">
        {/* <GrAchievement className="w-5 h-5" /> */}
        <FcPhoneAndroid className="w-5 h-5" />
        <span className="text-xs font-semibold uppercase">{row.name}</span>
    </Link>
  )
}

export default OfficialPill