import Image from 'next/image'
import React from 'react'
import Logo from '@/public/vercel.svg'
import { Query, database } from '@/appwrite';
import SquadPill from '@/components/SquadPill';
import Pitch from '@/components/Pitch';
import Link from 'next/link';
const { NEXT_PUBLIC_APPWRITE_DATABASE_ID } = process.env;

export const revalidate = 1800;

const getData = async (slug: any) => {
  try {
    let squad;
    let team:any = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"team", [ Query.equal("nickname", slug) ])  // Fetch Team Info
    if(team.total)
      squad = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"squad",[ Query.equal("team", team.documents[0].$id), Query.orderAsc("kitNo") ]);
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
    <div className="w-full md:max-h-[calc(100vh-6rem)]  max-w-xl space-y-2">
        <div className="p-2 md:p-4 rounded-r-md bg-gray-50/50 border-l-8 border-blue-950 shadow-md">
        <h1 className="w-full flex items-center justify-between font-bold text-[0.65rem] md:text-base tracking-widest">
            <span className="uppercase">{team?.documents[0]?.name}</span>
            <Link href="/teams" className="py-0.5 px-2 rounded-md bg-blue-950 text-xs text-white uppercase">TEAMS</Link>
        </h1>
        </div>
        
        <div className="px-4 py-10 w-full grid grid-cols-1 gap-8 rounded-lg shadow-xl">
          <article className="space-y-14 md:space-y-4"> 
              <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-auto">
                  <Pitch>
                    <div></div>
                  </Pitch>
                </div>
                <div className="w-full h-40 md:w-48">
                    <h1 className="ml-5 py-1 px-5 font-bold text-sm text-center text-slate-400 tracking-wider bg-slate-200 -skew-x-12">TEAM MANAGER</h1>
                    <div className="w-full h-full rounded-md border-2 flex flex-col items-center justify-center space-y-0.5">
                        <div className="relative h-32 w-32 rounded-full border-4 overflow-hidden">
                          <Image loading='lazy' src={`https://ehub.ucc.edu.gh/api/photos/?tag=${team?.documents[0]?.coachStaffNo}`} alt="" fill />
                        </div>
                        <p className="py-0.5 px-4 text-xs font-bold text-gray-400 bg-slate-100 rounded uppercase tracking-wider">{team?.documents[0]?.coachName}</p>
                    </div>
                </div>
              </div>
              
              <div>
                <h1 className="text-base font-bold text-slate-500 tracking-widest">SQUAD</h1>
                <div className="md:max-h-[34rem] grid grid-cols-1 gap-2 md:overflow-y-auto">
                { squad?.documents?.map((row:any) => (
                    <SquadPill key={row.$id} row={row} />
                ))}
                </div>
              </div>
              {/* <div className="py-4 flex items-center justify-between text-sm text-gray-600">
                  
              </div> */}
          </article>
        </div>
    </div>
  )
}

export default Team