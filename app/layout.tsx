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
const { NEXT_PUBLIC_APPWRITE_DATABASE_ID } = process.env;


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UCC STAFF LEAGUE',
  description: 'Developed By Blay Technologies',
}

export const revalidate = 60;

const getData:any = async (stageId = null) => {
  let teams = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"team",[]);
  let tables = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"standing",[]);
  let stages = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"stage",[]); // Onclick on Stage Load Knockout Data but by Default Current Stage Knockout Data
  
  // Current Stage where Default is true
  let stage:any = stageId 
      ? await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"stage", stageId)  // Load Knockout Stage with StageId
      : await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"stage",[ Query.equal("default", true) ]); // Load Default Knockout Stage
      
  // Fetch Knockout Data with stage.documents[0].$id
  let knockouts = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"knockout",[ Query.equal("stage", stage.documents[0].$id) ]);
  // Fetch Fixtures for Current Stage
  let fixture = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"fixture",[ Query.equal("stage", stage.documents[0].$id) ]);
  
  const data = await Promise.all([fixture,teams,stage,stages,tables,knockouts])
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
    for(const tb of data[4].documents){
       const row:any = { ...tb, group: tb.group.name, team: tb.team.name }
       if(gdata.has(row.group)){
       const dm = gdata.get(row.group);
         gdata.set(row.group, [...dm, row ])
       } else {
         gdata.set(row.group, [row])
       }
    }
    return Array.from(gdata);
  }

  const formatKnockoutData = () => {
    const gdata = new Map();
    for(const tb of data[5].documents){
       const row:any = { ...tb, group: tb.group.name, team: tb.team.name }
       if(gdata.has(row.group)){
        const dm = gdata.get(row.group);
         gdata.set(row.group, [...dm, row ])
       } else {
         gdata.set(row.group, [row])
       }
    }
    return Array.from(gdata);
  }

  const tables = formatTableData()
  const knockouts = await formatKnockoutData()
  const officials = [
    { name: 'ORGANIZING TEAM', slug: 'organizers'},
    { name: 'MANAGEMENT TEAM', slug: 'referees'},
    { name: 'MEDICAL TEAM', slug: 'medics'},
    { name: 'MEDIA & PUBLICATION TEAM', slug: 'media'},
  ]

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="pb-10 w-full h-full bg-slate-300">
          <div className="mx-auto w-full md:max-w-7xl bg-slate-50 md:rounded-b-3xl md:border-x-4 md:border-b-8 border-[#001e28] shadow-lg backdrop-blur-lg">
            
            {/* Advertisement & Sponsors - #00141e */}
            <header className="px-6 w-full h-24 bg-[#001e28] flex items-center justify-between space-x-4">
             
              <div className="flex items-center">
                <div className="relative md:w-24 md:h-16">
                  <Image className="" src={Logo} alt="Logo" fill />
                </div> 
                <div className="flex flex-col">
                  <span className="text-slate-100 font-arial font-black text-[2rem] md:text-6xl tracking-[0.4em]">USL</span>
                  <span className="text-slate-100 font-tahoma font-normal  text-[0.55em] md:text-base tracking-wider">UCC STAFF LEAGUE</span>
                </div>
              </div>
              <nav className="md:h-20 flex items-center bg-red-50 rounded-sm md:rounded-md text-blue-950">
                <Link href="/" className="p-2 md:p-6 font-black text-sm md:text-lg border-r-2 border-dashed border-blue-950 flex items-center space-x-2">
                  <MdOutlineScoreboard className="w-5 md:w-7 h-5 md:h-7" />
                  <span>Scores</span>
                </Link>
                <Link href="/news" className="p-2 md:p-6 font-black text-sm md:text-lg flex items-center space-x-2">
                  <BiNews className="w-5 md:w-7 h-5 md:h-7" />
                  <span>News</span>
                </Link>
              </nav>
            </header>

            {/* Content Page */}
            <main className="w-full flex flex-col md:flex-row">

                {/* Teams Sidebar */}
                <div className="order-3 md:order-1 px-4 py-6 w-full md:w-72 h-full md:border-r-2 border-red-100 bg-red-50 space-y-4">
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
                <div className="order-2 md:order-3 py-4 px-2 w-full md:w-96 bg-blue-100/50 space-y-2 md:space-y-4">
                  <div className="p-2 md:p-4 rounded-r-md bg-gray-50/50 border-l-8 border-red-800 shadow-md">
                      <h1 className="font-bold text-xs md:text-sm tracking-widest">TABLE STANDINGS</h1>
                  </div>
                  <div className="space-y-3">
                      { tables?.map(([key,data]:any) => (
                      <GroupPill key={key} title={key} data={data.sort((a:any,b:any) => b.points - a.points)} />
                      ))}
                  </div>
                </div>
            </main>
              
          </div>
        </div>
       
      </body>
    </html>
  )
}
