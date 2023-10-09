import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'official',
  title: 'Official',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role or Position',
      type: 'string',
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
    defineField({
      name: 'categories',
      title: 'Official Category',
      type: 'array',
      of: [{type: 'reference', to: {type: 'officialType'}}],
    })
  ],

  preview: {
    select: {
      title: 'name',
      position: 'role',
      media: 'mainImage',
    },
    prepare(selection) {
      const { position } = selection
      return {...selection, subtitle: position && `Role: ${position}`}
    },
  },
})
