import { Query, database } from '@/appwrite'
import FixturePill from '@/components/FixturePill'
const { NEXT_PUBLIC_APPWRITE_DATABASE_ID } = process.env;

export const revalidate = 60;

const getData:any = async (stageId = null) => {
  // Current Stage where Default is true
  let stage:any = stageId 
      ? await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"stage", stageId)  // Load Knockout Stage with StageId
      : await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"stage",[ Query.equal("default", true) ]); // Load Default Knockout Stage
      
  // Fetch Fixtures for Current Stage
  let fixture = await database.listDocuments(NEXT_PUBLIC_APPWRITE_DATABASE_ID!,"fixture",[ Query.equal("stage", stage.documents[0].$id) ]);
  
  const data = await Promise.all([fixture,stage])
  return data;
}

export default async function Home({ searchParams }: { searchParams: { stage: string }}) {
  
  const stageId = searchParams?.stage;
  const data: any = await getData(stageId);
  console.log(data[1]);
  
  return (
    <div className="w-full space-y-10">
        <div className="p-2 md:p-4 rounded-r-md bg-gray-50/50 border-l-8 border-blue-950 shadow-md">
          <h1 className="w-full flex items-center justify-between font-bold text-[0.65rem] md:text-sm tracking-widest">
            <span>MEN FOOTBALL - FIXTURES</span>
            <span className="py-0.5 px-2 rounded-sm bg-blue-950 text-xs text-white uppercase">{data[1].documents[0].name}</span>
          </h1>
        </div>
        
        <div className="w-full space-y-2">
          { data[0]?.documents?.map((row:any) => (
            <FixturePill key={row.$id} row={row} />
          ))}
        </div>
    </div>
  )
}
