import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemas/blockContent'
import category from './schemas/category'
import post from './schemas/post'
import author from './schemas/author'
import official from './schemas/official'
import officialType from './schemas/officialType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [official,officialType,post, author, category, blockContent],
}
