import { HomeIcon } from '@sanity/icons'

export const hero = {
  name: 'hero',
  title: 'Homepage Hero',
  type: 'document',
  icon: HomeIcon,
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'The main big text on the home page (e.g. "CRAFTING DIGITAL EXPERIENCES")',
    },
    {
      name: 'subHeadline',
      title: 'Sub-Headline',
      type: 'text',
      rows: 2,
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    },
    {
      name: 'ctaUrl',
      title: 'CTA Button URL',
      type: 'string',
    },
  ],
}
