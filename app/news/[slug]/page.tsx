import Image from 'next/image'
import React from 'react'
import Logo from '@/public/vercel.svg'
import Link from 'next/link'
import { sanityClient, urlFor } from '@/sanity'
import moment from 'moment'
import { PortableText } from '@portabletext/react'
import { RichTextComponents } from '@/components/RichTextComponents'
import { Metadata } from 'next'

export const revalidate = 3600;

const getData = async (slug: string) => {
  const query = `*[_type == "post" && slug.current == $slug] | order(_createdAt desc) {_id,title,author->{name,image},categories[]->{title},mainImage,slug,_createdAt,publishedAt,body[]{ ..., asset->{ ..., "_key": _id } }}[0]`
//   const query = `*[_type == "post" && "publication" in categories[]->slug.current] | order(_createdAt desc) {_id,title,author->{name,image},categories[]->{title},mainImage,slug,_createdAt,body[]{ ..., asset->{ ..., "_key": _id } }} [0...4]`
  const data = await sanityClient.fetch(query,{ slug })
  return data;
}

export const metadata: Metadata = {
  openGraph: {
    title: 'Next.js',
    description: 'The React Framework for the Web',
    url: 'https://nextjs.org',
    siteName: 'Next.js',
    images: [
      {
        url: 'https://nextjs.org/og.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};



async function News({ params }: { params: { slug: string }}) {

  const row = await getData(params?.slug);
  console.log(params?.slug,row)
  

  return (
    <div className="w-full max-w-xl space-y-2">
        <div className="p-2 md:p-4 rounded-r-md bg-gray-50/50 border-l-8 border-blue-950 shadow-md">
        <h1 className="w-full flex items-center justify-between font-bold text-[0.65rem] md:text-sm tracking-widest">
            <span>LEAGUE NEWS</span>
            <Link href="/news" className="py-0.5 px-2 rounded-md bg-blue-950 text-white">ALL NEWS</Link>
        </h1>
        </div>
        
        <div className="w-full grid grid-cols-1 gap-8 overflow-y-auto">
           <main className="px-2 py-10 rounded-lg shadow-xl ">
              <article className="space-y-3">
                <div className="p-3 relative aspect-video rounded bg-slate-100">
                    <Image src={row?.mainImage && urlFor(row?.mainImage).url()} alt={row?.title} className="h-48 w-full object-cover rounded-md" fill />
                </div>
                <h1 className="text-2xl font-bold text-gray-600">{row?.title}</h1>
                <article className="text-black prose">
                  <PortableText value={row?.body} components={RichTextComponents} /> 
                  {/* <PortableText value={row?.body} />  */}
                </article>
                <div className="py-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-2 text-sm text-gray-600">
                  <span className="px-2 py-0.5 bg-slate-100 rounded">Released: {moment(row?.publishedAt).format('LL')}</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded">Author: {row?.author?.name}</span>
                </div>
              </article>
           </main>
        </div>
    </div>
  )
}

export default News