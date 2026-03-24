import { groq } from 'next-sanity'

export const projectsQuery = groq`*[_type == "project"] | order(id asc) {
  _id,
  id,
  title,
  category,
  year,
  url,
  description,
  image {
    asset->{
      _id,
      url
    }
  }
}`
