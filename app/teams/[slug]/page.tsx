import Image from 'next/image'
import React from 'react'
import Logo from '@/public/vercel.svg'
import Link from 'next/link'
import { Query, database } from '@/appwrite';
import SquadPill from '@/components/SquadPill';
const { NEXT_PUBLIC_APPWRITE_DATABASE_ID } = process.env;

export const revalidate = 3000;

const getData = async (slug: any) => {
  let team:any = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"team", slug)  // Fetch Team Info
  let squad = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"squad",[ Query.equal("team", team.documents[0].$id) ]);

  const data = await Promise.all([team,squad])
  return data;
}

async function Team({ params }: { params: { slug: string }}) {

  const data:any = await getData(params?.slug)
  const team = data[0].documents;
//   const coaches = [
//     { name: team.coachName, staffNo: team.coachStaffNo, role:'Head Coach', contact: team.coachContact },
//     { name: team.assCoachName, staffNo: team.assCoachStaffNo, role:'Assistant Coach', contact: team.coachContact }
//   ]

  return (
    <div className="w-full max-w-xl space-y-2">
        <div className="p-2 md:p-4 rounded-r-md bg-gray-50/50 border-l-8 border-blue-950 shadow-md">
        <h1 className="w-full flex items-center justify-between font-bold text-[0.65rem] md:text-sm tracking-widest">
            <span className="uppercase">{team.name}</span>
            <span className="py-0.5 px-2 rounded-sm bg-blue-950 text-white">TEAM</span>
        </h1>
        </div>
        
        <div className="px-4 py-10 w-full grid grid-cols-1 gap-8 rounded-lg shadow-xl overflow-y-auto">
        <div className="px-3 py-6 rounded-lg shadow-xl ">
            <article className="space-y-3"> 
                <div className="p-3 relative aspect-video rounded bg-slate-100">
                    <Image src={Logo} alt="Team Teaser" className="h-56 w-full" fill />
                    <div className="absolute w-22 h-22 left-10 bottom-10 rounded-full shadow-xl">
                        <Image src={Logo} alt="Team Teaser" className="h-20 w-full" fill />
                    </div>
                </div>
                <h1 className="text-xl font-bold text-gray-600">SQUAD</h1>
                <div className="grid grid-cols-1 gap-4">
                { data[1]?.documents?.map((row:any) => (
                    <SquadPill key={row.$id} row={row} />
                ))}
                </div>
                <div className="py-4 flex items-center justify-between text-sm text-gray-600">
                    
                </div>
            </article>
        </div>

        </div>
    </div>
  )
}

export default Team