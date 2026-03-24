import { CaseIcon } from '@sanity/icons'

export const experience = {
  name: 'experience',
  title: 'Work Experience',
  type: 'document',
  icon: CaseIcon,
  fields: [
    {
      name: 'company',
      title: 'Company Name',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Job Role',
      type: 'string',
    },
    {
      name: 'period',
      title: 'Period (e.g. 2024 - Present)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Job Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'skills',
      title: 'Skills Used',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
}
