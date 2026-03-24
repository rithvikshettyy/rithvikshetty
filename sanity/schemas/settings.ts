import { CogIcon } from '@sanity/icons'

export const settings = {
  name: 'settings',
  title: 'Global Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    {
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    },
    {
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
        },
      ],
    },
  ],
}
