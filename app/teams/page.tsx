import Image from 'next/image'
import React from 'react'
import Logo from '@/public/vercel.svg'
import Link from 'next/link'
import { Query, database } from '@/appwrite'
import MainTeamPill from '@/components/MainTeamPill'
const { NEXT_PUBLIC_APPWRITE_DATABASE_ID } = process.env;

export const revalidate = 1800;

const getData:any = async () => {
    let teams = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"team",[Query.orderAsc("name")]);
    return teams;
}
  
async function Teams() {
  
  const teams: any = await getData();
  
  return (
    <div className="pb-8 w-full max-h-[calc(100vh-6rem)] space-y-4 overflow-y-auto">
    <div className="z-20 sticky top-0 p-2 md:p-4 rounded-r-md bg-gray-50 border-l-8 border-blue-950 shadow-md">
      <h1 className="w-full flex items-center justify-between font-bold text-[0.65rem] md:text-sm tracking-widest">
        <span>USL TEAMS</span>
        {/* <span className="py-0.5 px-2 rounded-md bg-blue-950 text-xs text-white uppercase">FORM</span> */}
        <Link href="/" className="py-0.5 px-2 rounded-md bg-blue-950 text-xs text-white uppercase">FIXTURES</Link>
      </h1>
    </div>
    
    <div className="z-10 w-full space-y-2">
      { teams?.documents?.map((row:any,index: number) => (
        <Link className="block" key={row.$id} href={`/teams/${row.nickname?.toLowerCase()}`}>
            <div><MainTeamPill index={index} row={row} /></div>
        </Link>
      ))}
    </div>
</div>
  )
}

export default Teams