import Image from 'next/image'
import React from 'react'
import Logo from '@/public/vercel.svg'
import Link from 'next/link'

function News() {
  return (
    <div className="w-full max-w-xl space-y-2">
        <div className="p-2 md:p-4 rounded-r-md bg-gray-50/50 border-l-8 border-blue-950 shadow-md">
        <h1 className="w-full flex items-center justify-between font-bold text-[0.65rem] md:text-sm tracking-widest">
            <span>LEAGUE NEWS</span>
            <span className="py-0.5 px-2 rounded-sm bg-blue-950 text-white">TOP</span>
        </h1>
        </div>
        
        <div className="px-4 py-10 w-full grid grid-cols-1 gap-8 rounded-lg shadow-xl overflow-y-auto">
        <Link href="/news/slug-01" className="px-8 py-10 rounded-lg shadow-xl ">
            <article className="space-y-3">
                <div className="p-3 relative aspect-video rounded bg-slate-100">
                    <Image src={Logo} alt="Article Image" className="h-20 w-full" fill />
                </div>
                <h1 className="text-xl font-bold text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut quis ipsum tempore?</h1>
                <p className="">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos, et sequi cum placeat aliquam nihil dolorem dolorum omnis, exercitationem ut quod odit eius animi excepturi odio at, ratione molestiae neque?
                </p>
                <div className="py-4 flex items-center justify-between text-sm text-gray-600">
                    <span>Released: Aug 14, 2023</span>
                    <span>Author: Nat Danso</span>
                </div>
            </article>
        </Link>

        <Link href="/news/slug-02" className="px-8 py-10 rounded-lg shadow-xl ">
            <article className="space-y-3">
                <div className="p-3 relative aspect-video rounded bg-slate-100">
                    <Image src={Logo} alt="Article Image" className="h-20 w-full" fill />
                </div>
                <h1 className="text-xl font-bold text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut quis ipsum tempore?</h1>
                <p className="">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos, et sequi cum placeat aliquam nihil dolorem dolorum omnis, exercitationem ut quod odit eius animi excepturi odio at, ratione molestiae neque?
                </p>
                <div className="py-4 flex items-center justify-between text-sm text-gray-600">
                    <span>Released: Aug 14, 2023</span>
                    <span>Author: Nat Danso</span>
                </div>
            </article>
        </Link>

           
        </div>
    </div>
  )
}

export default News