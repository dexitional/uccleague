import { BiFootball,BiGroup,BiNews } from 'react-icons/bi'
import { FaFootball,FaTeamspeak } from 'react-icons/fa6'
import { MdOutlineScoreboard } from 'react-icons/md'
import { GiBorderedShield,GiRosaShield } from 'react-icons/gi'
import { database } from '@/appwrite'
import moment from 'moment'
import GroupPill from '@/components/GroupPill'
import FixturePill from '@/components/FixturePill'
import TeamPill from '@/components/TeamPill'
const { NEXT_PUBLIC_APPWRITE_DATABASE_ID } = process.env;

export const revalidate = 0;

const getData = async () => {
  let fixture = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"fixture",[]);
  let teams = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"team",[]);
  let tables = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"table",[]);
  const data = await Promise.all([fixture,teams,tables])
  return data;
}

export default async function Home() {
  
  const data: any = await getData();
  console.log(data)

  return (
  <div className="w-full ">
    <div className="mx-auto w-full max-w-7xl h-screen bg-slate-50 border-x border-dashed border-gray-600 shadow-lg backdrop-blur-lg">
      
       {/* Advertisement & Sponsors - #00141e */}
       <header className="px-6 w-full h-24 bg-[#001e28] flex items-center space-x-4">
         <div className="flex flex-col">
            <span className="text-white font-arial font-black text-6xl tracking-[0.4em]">USL</span>
            <span className="text-white font-tahoma font-normal text-xs">UNIVERSITY STAFF LEAGUE</span>
         </div>
         <nav className="h-20 flex items-center bg-red-50 rounded-md text-blue-950">
          <div className="p-6 font-black text-lg border-r-2 border-dashed border-blue-950 flex items-center space-x-2">
            <MdOutlineScoreboard className="w-7 h-7" />
            <span>Scores</span>
          </div>
          <div className="p-6 font-black text-lg flex items-center space-x-2">
            <BiNews className="w-7 h-7" />
            <span>News</span>
          </div>
         </nav>
       </header>

       {/* Content Page */}
       <main className="w-full flex">

          {/* Teams Sidebar */}

          <div className="px-4 py-6 w-72 h-screen border-r-2 border-red-100 bg-red-50 space-y-4">
            <h1 className="text-sm font-semibold">MEMBER TEAMS</h1>
            <nav className="space-y-3">
              {data[1]?.documents?.map((row:any) => (
                 <TeamPill key={row.$id} row={row} />
              ))}
            </nav>
          </div>

          {/* Inner Page */}
          <div className="p-4 flex-1 space-y-10">
              <div className="p-4 rounded-r-md bg-gray-50/50 border-l-8 border-blue-950 shadow-md">
                <h1 className="font-bold text-sm tracking-widest">MEN FOOTBALL -  FIXTURES</h1>
              </div>
             
              <div className="w-full space-y-1">
                { data[0]?.documents?.map((row:any) => (
                 <FixturePill key={row.$id} row={row} />
                ))}
              </div>
              
          </div>

          {/*  Group Table */}
          <div className="py-4 px-2 w-96 bg-blue-100/50 space-y-4">
             <div className="p-4 rounded-r-md bg-gray-50/50 border-l-8 border-red-800 shadow-md">
                <h1 className="font-bold text-sm tracking-widest">TABLE STANDINGS</h1>
             </div>
             <div className="space-y-3">
                { data?.map((row:any) => (
                 <GroupPill key={row.$id} title="Group A" data={null} />
                ))}
             </div>
          </div>
       </main>
        
    </div>
   </div>
  )
}
