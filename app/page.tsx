import { Query, database } from '@/appwrite'
import FixturePill from '@/components/FixturePill'
import LivePill from '@/components/LivePill';
import RoadMap from '@/components/RoadMap';
import StageFixtureCard from '@/components/StageFixtureCard';
import Link from 'next/link';
import { GiBorderedShield } from 'react-icons/gi';
const { NEXT_PUBLIC_APPWRITE_DATABASE_ID } = process.env;

export const revalidate = 1800;

const getData:any = async (stageId = null) => {
  // Current Stage where Default is true
  let stage:any = stageId 
      ? await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"stage", stageId)  // Load Knockout Stage with StageId
      : await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"stage",[ Query.equal("default", true) ]); // Load Default Knockout Stage
      
  // Fetch Fixtures for Current Stage
  let fixture,knockout;
  if(stage?.total)
   fixture = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"fixture",[ Query.equal("stage", stage.documents[0].$id), Query.orderDesc("kickoff"), Query.limit(50) ]);
   knockout = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"fixture",[ Query.isNotNull("slot") ]);
  
  const data = await Promise.all([fixture,stage,knockout])
  return data;
}

export default async function Home({ searchParams }: { searchParams: { stage: string }}) {
  
  const stageId = searchParams?.stage;
  const data: any = await getData(stageId);
  const live = data[0]?.documents?.filter((r:any) => r.kickstatus == 'live')
  
  const formatKnockoutData = () => {
    const gdata = new Map();
    for(const tb of data[2]?.documents){
      if(!gdata.has(tb.slot)){
          gdata.set(tb.slot, tb)
      }
    }
    return gdata;
  }
  
  return (
    <div className="pb-8 w-full max-h-[calc(100vh-6rem)] space-y-4 overflow-y-auto">
        <div className="z-20 sticky top-0 p-2 md:p-4 rounded-r-md bg-gray-50 border-l-8 border-blue-950 shadow-md">
          <h1 className="w-full flex items-center justify-between font-bold text-[0.65rem] md:text-sm tracking-widest">
            <span>RESULTS & FIXTURES</span>
            {/* <Link href="/teams" className="py-0.5 px-2 rounded-sm bg-blue-950 text-xs text-white uppercase">{data[1].documents[0].name}</Link> */}
            <Link href="/teams" className="py-0.5 px-2 rounded-md bg-blue-950 text-xs text-white uppercase">TEAMS</Link>
          </h1>
        </div>

        { live?.length ?
        <div className="z-20 m-0 sticky top-9 md:top-12">
          <LivePill data={live && live[0]} />
        </div>
        : null
        }

        <RoadMap data={formatKnockoutData()} />

       { data[1]?.documents[0]?.type?.toLowerCase() == 'knockout' && 
       (<div className="z-20 p-2 md:p-3 rounded-r-md bg-gray-50 border-l-4 border-red-700 shadow">
          <h1 className="w-full flex items-center justify-between font-bold text-[0.65rem] md:text-sm tracking-widest">
            <span className="uppercase">{ data[1]?.documents[0]?.name }</span>
            <span className="py-0.5 px-2 rounded-sm bg-blue-950 text-xs text-white uppercase">{ data[0]?.total } GAMES</span>
          </h1>
        </div>
       )}

        <div className="z-10 w-full space-y-2">
          { data[0]?.documents?.filter((r:any) => r.kickstatus != 'live')?.map((row:any,index: number) => (
            <FixturePill key={row.$id} index={index} row={row} />
          ))}
        </div>
    </div>
  )
}
