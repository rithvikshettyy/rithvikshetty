import { CogIcon, HomeIcon, UserIcon, CaseIcon, DocumentIcon } from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website Content')
    .items([
      // Global Settings
      S.listItem()
        .title('Global Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
            .title('Global Settings')
        ),
      
      S.divider(),

      // Homepage Group
      S.listItem()
        .title('Homepage')
        .icon(HomeIcon)
        .child(
          S.list()
            .title('Homepage Content')
            .items([
              S.listItem()
                .title('Hero Section')
                .icon(HomeIcon)
                .child(
                  S.document()
                    .schemaType('hero')
                    .documentId('hero')
                    .title('Hero Section')
                ),
              S.listItem()
                .title('Selected Works (Projects)')
                .icon(DocumentIcon)
                .child(S.documentTypeList('project').title('Selected Works')),
            ])
        ),

      // About Page Group
      S.listItem()
        .title('About Page')
        .icon(UserIcon)
        .child(
          S.list()
            .title('About Content')
            .items([
              S.listItem()
                .title('Main Info')
                .icon(UserIcon)
                .child(
                  S.document()
                    .schemaType('about')
                    .documentId('about')
                    .title('About Page Main Info')
                ),
              S.listItem()
                .title('Experience Timeline')
                .icon(CaseIcon)
                .child(S.documentTypeList('experience').title('Work History')),
            ])
        ),

      // Other Collections (In case they want to see all projects separately)
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['settings', 'hero', 'about', 'project', 'experience'].includes(listItem.getId() || '')
      ),
    ])
