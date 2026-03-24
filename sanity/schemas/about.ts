import { UserIcon } from '@sanity/icons'

export const about = {
  name: 'about',
  title: 'About Page Content',
  type: 'document',
  icon: UserIcon,
  fields: [
    {
      name: 'topHeader',
      title: 'Top Page Header',
      type: 'string',
    },
    {
      name: 'mainHeadline',
      title: 'Main Headline',
      type: 'string',
    },
    {
      name: 'bioText',
      title: 'Biography Text',
      type: 'text',
      rows: 6,
    },
    {
      name: 'specialization',
      title: 'Specialization Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
          ],
        },
      ],
    },
  ],
}
