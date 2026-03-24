import { groq } from 'next-sanity'

export const projectsQuery = groq`*[_type == "project"] | order(order asc) {
  _id,
  id,
  title,
  "slug": slug.current,
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

export const singleProjectQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  id,
  title,
  "slug": slug.current,
  client,
  category,
  year,
  url,
  description,
  overview,
  outcome,
  image {
    asset->{
      _id,
      url
    }
  },
  gallery[] {
    asset->{
      _id,
      url
    }
  }
}`
