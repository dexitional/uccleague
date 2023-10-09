import Image from 'next/image'
import React from 'react'
import Logo from '@/public/vercel.svg'
import Link from 'next/link'
import { sanityClient, urlFor } from '@/sanity'
import { toPlainText } from '@portabletext/react'
import moment from 'moment'

//export const revalidate = 360;

const getData = async () => {
  const query = `*[_type == "post"] | order(_createdAt desc) {_id,title,author->{name,image},categories[]->{title},mainImage,slug,_createdAt,body[]{ ..., asset->{ ..., "_key": _id } }} [0...4]`
//   const query = `*[_type == "post" && "publication" in categories[]->slug.current] | order(_createdAt desc) {_id,title,author->{name,image},categories[]->{title},mainImage,slug,_createdAt,body[]{ ..., asset->{ ..., "_key": _id } }} [0...4]`
  const data = await sanityClient.fetch(query)
  return data;
}


async function News() {

  const news = await getData();

  return (
    <div className="w-full max-w-xl space-y-2">
        <div className="p-2 md:p-4 rounded-r-md bg-gray-50/50 border-l-8 border-blue-950 shadow-md">
        <h1 className="w-full flex items-center justify-between font-bold text-[0.65rem] md:text-sm tracking-widest">
            <span>LEAGUE NEWS</span>
            <span className="py-0.5 px-2 rounded-sm bg-blue-950 text-white">NEWS</span>
        </h1>
        </div>
        
        <div className="px-4 py-6 w-full grid grid-cols-1 md:grid-cols-2 gap-2 rounded-lg shadow-xl overflow-y-auto">
            { news.map((row: any) => (
            <Link key={row._id} href={`/news/${row.slug?.current}`} className="px-3 py-4 rounded-lg shadow-xl ">
                <article className="space-y-3">
                    <div className="p-3 relative aspect-video rounded bg-slate-100">
                      <Image src={row.mainImage && urlFor(row.mainImage).url() || Logo} alt="Article Image" className="h-20 w-full object-cover rounded" fill />
                    </div>
                    <h1 className="text-md font-bold text-gray-600">{row.title}</h1>
                    <p className="text-gray-600 text-sm leading-relaxed">{toPlainText(row.body)?.split('.')[0]+' ...'}</p>
                    <div className="px-2 py-3 flex flex-col items-center justify-between space-y-1 text-sm text-gray-400 font-medium bg-slate-100 rounded-xl">
                        <span>Published: {moment(row.publishedAt).format('LL')}</span>
                        <span>By: {row.author?.name}</span>
                    </div>
                </article>
            </Link>
            ))} 
        </div>
    </div>
  )
}

export default News