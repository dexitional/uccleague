import Image from 'next/image'
import React from 'react'
import Logo from '@/public/vercel.svg'
import Link from 'next/link'
import { sanityClient, urlFor } from '@/sanity'
import moment from 'moment'
import { PortableText } from '@portabletext/react'
import { RichTextComponents } from '@/components/RichTextComponents'
import { Metadata } from 'next'
import { MdContactPhone } from 'react-icons/md'
import { BsPhoneFill } from 'react-icons/bs'

export const revalidate = 360;

const getData = async (slug: string) => {
  // const query = `*[_type == "official" && slug.current == $slug] | order(_createdAt desc) {_id,title,author->{name,image},categories[]->{title},mainImage,slug,_createdAt,publishedAt,body[]{ ..., asset->{ ..., "_key": _id } }}[0]`
  const query = `*[_type == "official" && $slug in categories[]->slug.current] | order(_createdAt desc) {_id,name,contact,role,categories[0]->{title},mainImage,slug,_createdAt,}`
  //   const query = `*[_type == "post" && "publication" in categories[]->slug.current] | order(_createdAt desc) {_id,title,author->{name,image},categories[]->{title},mainImage,slug,_createdAt,body[]{ ..., asset->{ ..., "_key": _id } }} [0...4]`
  const data = await sanityClient.fetch(query,{ slug })
  return data;
}

async function News({ params }: { params: { slug: string }}) {

  const data = await getData(params?.slug);
  console.log(data)
  

  return (
    <div className="w-full max-w-xl space-y-2">
        <div className="p-2 md:p-4 rounded-r-md bg-gray-50/50 border-l-8 border-blue-950 shadow-md">
        <h1 className="w-full flex items-center justify-between font-bold text-[0.65rem] md:text-sm tracking-widest">
            <span>{data[0]?.categories?.title?.toUpperCase() }</span>
            <Link href="/news" className="py-0.5 px-2 rounded-md bg-blue-950 text-white">{'<'} FIXTURES</Link>
        </h1>
        </div>
        
        <div className="w-full overflow-y-auto">
           <main className="px-2 py-10 rounded-lg shadow-xl ">
              <article className="space-y-3 grid md:grid-cols-2 gap-4">
                 { data?.map((row:any) => (
                 <div key={row._id} className="w-full rounded-lg shadow-lg">
                    <div className="relative h-48 w-full">
                      <Image src={row.mainImage && urlFor(row.mainImage).url()} className="h-48 w-48 object-cover object-top" alt="" fill />
                    </div>
                    <div className="px-4 py-4 space-y-2">
                       <h1 className="text-[0.85rem] font-semibold">{row.name.toUpperCase()}</h1>
                       <h2 className="px-2 py-0.5 bg-slate-100 text-xs font-medium rounded-r-lg border-l-4 border-blue-950">{row.role.toUpperCase()}</h2>
                       <p className="text-xs font-medium italic flex items-center space-x-2">
                        <BsPhoneFill className="h-4 w-4"/>
                        <span>{row.contact}</span>
                       </p>
                    </div>
                 </div>
                 ))}
              </article>
           </main>
        </div>
    </div>
  )
}

export default News