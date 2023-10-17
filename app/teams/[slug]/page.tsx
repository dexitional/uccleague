import Image from 'next/image'
import React from 'react'
import Logo from '@/public/vercel.svg'
import { Query, database } from '@/appwrite';
import SquadPill from '@/components/SquadPill';
import Pitch from '@/components/Pitch';
import Link from 'next/link';
const { NEXT_PUBLIC_APPWRITE_DATABASE_ID } = process.env;

export const revalidate = 3000;

const getData = async (slug: any) => {
  try {
    let squad;
    let team:any = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"team", [ Query.equal("nickname", slug) ])  // Fetch Team Info
    if(team.total)
      squad = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"squad",[ Query.equal("team", team.documents[0].$id) ]);
    const data = await Promise.all([team,squad])
    return data;
    
  } catch (error) {
    return null
  }
  
}

async function Team({ params }: { params: { slug: string }}) {

  const data:any = await getData(params?.slug)
  if(!data) return (<div>No Data</div>)
  const [ team,squad ] = data;
//   const coaches = [
//     { name: team.coachName, staffNo: team.coachStaffNo, role:'Head Coach', contact: team.coachContact },
//     { name: team.assCoachName, staffNo: team.assCoachStaffNo, role:'Assistant Coach', contact: team.coachContact }
//   ]

  return (
    <div className="w-full max-w-xl space-y-2">
        <div className="p-2 md:p-4 rounded-r-md bg-gray-50/50 border-l-8 border-blue-950 shadow-md">
        <h1 className="w-full flex items-center justify-between font-bold text-[0.65rem] md:text-sm tracking-widest">
            <span className="uppercase">{team?.documents[0]?.name}</span>
            <Link href="/teams" className="py-0.5 px-2 rounded-md bg-blue-950 text-xs text-white uppercase">TEAMS</Link>
        </h1>
        </div>
        
        <div className="px-4 py-10 w-full grid grid-cols-1 gap-8 rounded-lg shadow-xl overflow-y-auto">
       
          <article className="space-y-3"> 
              
              
              <Pitch>
                {/* 4-4-2 */}
                <div></div>
              </Pitch>
              <h1 className="text-base font-bold text-slate-500 tracking-widest">SQUAD</h1>
              <div className="grid grid-cols-1 gap-4">
              { squad?.documents?.map((row:any) => (
                  <SquadPill key={row.$id} row={row} />
              ))}
              </div>
              <div className="py-4 flex items-center justify-between text-sm text-gray-600">
                  
              </div>
          </article>
        </div>
    </div>
  )
}

export default Team