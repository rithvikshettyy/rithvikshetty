import { type SchemaTypeDefinition } from "sanity"
import { project } from "./schemas/project"
import { settings } from "./schemas/settings"
import { hero } from "./schemas/hero"
import { experience } from "./schemas/experience"
import { about } from "./schemas/about"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, settings, hero, experience, about],
}
