import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'officialType',
  title: 'Official Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    })
  ],
})
