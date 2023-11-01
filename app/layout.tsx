import './globals.css'
import type { Metadata } from 'next'
import { BiNews } from 'react-icons/bi'
import { MdOutlineScoreboard } from 'react-icons/md'
import { Query, database } from '@/appwrite'
import GroupPill from '@/components/GroupPill'
import TeamPill from '@/components/TeamPill'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/public/eagle.png'
import OfficialPill from '@/components/OfficialPill'
import StagePill from '@/components/StagePill'
import Script from 'next/script'
import { GiLaurelsTrophy } from 'react-icons/gi'
const { NEXT_PUBLIC_APPWRITE_DATABASE_ID } = process.env;


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UCC STAFF LEAGUE',
  description: 'Developed By Blay Technologies',
}

export const revalidate = 720;

const getData:any = async (stageId = null) => {
  let teams = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"team",[]);
  let tables = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"standing",[]);
  let stages = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"stage",[]); // Onclick on Stage Load Knockout Data but by Default Current Stage Knockout Data
  
  // Current Stage where Default is true
  let stage:any = stageId 
      ? await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"stage", stageId)  // Load Knockout Stage with StageId
      : await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"stage",[ Query.equal("default", true) ]); // Load Default Knockout Stage
      
  let fixture;
  
  const data = await Promise.all([fixture,teams,stage,stages,tables])
  return data;
}

export default async function RootLayout({
  children,
  searchParams
}: {
  children: React.ReactNode,
  searchParams: { stage: string }
}) {

  const stageId = searchParams?.stage;
  const data: any = await getData(stageId);
  
  const formatTableData = () => {
    const gdata = new Map();
    for(const tb of data[4]?.documents){
       const row:any = { ...tb, group: tb.group.name, team: tb.team.name }
       if(gdata.has(row.group)){
       const dm = gdata.get(row.group);
         gdata.set(row.group, [...dm, row ])
       } else {
         gdata.set(row.group, [row])
       }
    }
    //return Array.from(gdata); // Unsorted Map
    return Array.from(new Map([...gdata.entries()].sort())); // Sorted Map in Alphabetical Order
  }

  
  const formatThirdPlaceData = () => {
    const gdata = new Map();
    const thirdData:any = [];
    for(const tb of data[4]?.documents){
       const row:any = { ...tb, group: tb.group.name, team: tb.team.name }
       if(gdata.has(row.group)){
        const dm = gdata.get(row.group);
         gdata.set(row.group, [...dm, row ])
       } else {
         gdata.set(row.group, [row])
       }
    }
    const newData = Array.from(gdata);
    newData?.map(([key,data], i) => {
      const sortData = data.sort((a:any,b:any) => b.points - a.points);
      for(let j = 0; j <= sortData.length; j++){
          if(j==2) thirdData.push(sortData[j]);
      }
    })
    //.sort((a:any,b:any) => b.points - a.points)
    return [["Third Place Ranking", thirdData ]];
  }

  const tables = formatTableData()
  const thirdplaces = formatThirdPlaceData()
  const officials = [
    { name: 'ORGANIZING TEAM', slug: 'organizers'},
    { name: 'MANAGEMENT TEAM', slug: 'referees'},
    { name: 'MEDICAL TEAM', slug: 'medics'},
    { name: 'MEDIA & PUBLICATION TEAM', slug: 'media'},
  ]

  return (
    <html lang="en">
      <Script async src="https://cdn.splitbee.io/sb.js" />
      <body className={inter.className}>
        <div className="w-full h-full bg-slate-300">
          <div className="mx-auto w-full h-screen md:max-w-7xl bg-slate-50 md:rounded-b-3xl md:border-x-4 md:border-b-8 border-[#001e28] shadow-lg backdrop-blur-lg overflow-y-auto md:overflow-y-hidden">
            
            {/* Advertisement & Sponsors - #00141e */}
            <header className="z-10 fixed px-3 md:px-6 w-full h-24 bg-[#001e28] flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-1 md:space-x-2">
                <div className="relative w-14 h-14 md:w-20 md:h-20">
                  {/* <Image className="" src={Logo} alt="Logo" fill /> */}
                  <GiLaurelsTrophy className="h-14 w-14 md:h-20 md:w-20 text-white"  />
                  <span className="absolute top-1/3 left-1/2 -translate-y-1/2 -translate-x-1/2 font-extrabold text-blue-950 text-[0.6rem] md:text-sm -rotate-90 tracking-widest">UCC</span>
                </div> 
                <div className="flex flex-col -space-y-2 md:space-y-0">
                  <span className="text-slate-100 font-arial font-black text-[2rem] md:text-6xl tracking-[0.8rem] italic">USL</span>
                  <span className="text-slate-100 font-tahoma font-normal  text-[0.55em] md:text-sm tracking-wider">UCC STAFF LEAGUE</span>
                </div>
              </div>
              <nav className="md:h-20 flex items-center bg-red-50 rounded-sm md:rounded-md text-blue-950">
                <Link href="/" className="p-2 md:p-6 font-black text-sm md:text-lg border-r-2 border-dashed border-blue-950 flex items-center space-x-2">
                  <MdOutlineScoreboard className="w-5 md:w-7 h-5 md:h-7" />
                  <span className="hidden md:block">Scores</span>
                </Link>
                <Link href="/news" className="p-2 md:p-6 font-black text-sm md:text-lg flex items-center space-x-2">
                  <BiNews className="w-5 md:w-7 h-5 md:h-7" />
                  <span className="hidden md:block">News</span>
                </Link>
              </nav>
            </header>

            {/* Content Page */}
            <main className="pt-24 w-full md:max-h-[calc(100vh-6rem)] flex flex-col md:flex-row">

                {/* Teams Sidebar */}
                <div className="order-3 md:order-1 px-4 py-6 w-full md:w-72 h-full md:h-[calc(100vh-6rem)] md:border-r-2 border-red-100 bg-red-50 space-y-3 overflow-y-auto">
                  <h1 className="text-xs md:text-sm font-semibold">MEMBER TEAMS</h1>
                  <nav className="space-y-3">
                    {data[1]?.documents?.map((row:any) => (
                      <TeamPill key={row.$id} row={row} />
                    ))}
                  </nav>

                 {/* OFFICIALS */}
                 <div className="w-full py-1"></div>
                  <h1 className="text-xs md:text-sm font-semibold">ORGANIZATION & OFFICIALS</h1>
                  <nav className="space-y-3">
                    {officials.map((row:any) => (
                      <OfficialPill key={row.$id} row={row} />
                    ))}
                  </nav>

                 {/* LEAGE STAGES */}
                  <div className="w-full py-1"></div>
                  <h1 className="text-xs md:text-sm font-semibold">LEAGUE STAGES</h1>
                  <nav className="space-y-3">
                    {data[3]?.documents?.sort((a:any, b:any) => a.order-b.order).map((row:any) => (
                      <StagePill key={row.$id} row={row} />
                    ))}
                  </nav>
                  
                </div>

                <div className="order-1 md:order-2 p-4 flex-1">
                  {children}
                </div>

                {/*  Group Table */}
                <div className="order-2 md:order-3 py-4 px-2 w-full md:w-96 h-full md:h-[calc(100vh-6rem)]  bg-blue-100/50 space-y-2 md:space-y-4 overflow-y-auto">
                  {/* <div className="p-2 md:p-4 rounded-r-md bg-gray-50/50 border-l-8 border-red-800 shadow-md">
                      <h1 className="font-bold text-xs md:text-sm tracking-widest">TABLE STANDINGS</h1>
                  </div> */}
                 
                  <div className="space-y-3">
                      {/* Group Standings */}
                      { tables?.map(([key,data]:any, i:number) => (
                        <GroupPill index={i} key={key} title={key?.toUpperCase()} data={data.sort((a:any,b:any) => b.points - a.points)} />
                        ))
                      }
                      
                      {/* Third Place Standings */}
                      { thirdplaces?.map(([key,data]:any, i:number) => (
                        <GroupPill index={i} key={key} title={key?.toUpperCase()} data={data.sort((a:any,b:any) => b.points - a.points)} />
                        ))
                      }
                  </div>
                </div>
            </main>
              
          </div>
        </div>
       
      </body>
    </html>
  )
}
