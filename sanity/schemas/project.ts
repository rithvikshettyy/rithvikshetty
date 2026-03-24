import { createSchema } from "sanity"

export const project = {
  name: "project",
  type: "document",
  title: "Project",
  fields: [
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "id",
      type: "string",
      title: "ID",
      description: "e.g., 01, 02",
    },
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "client",
      type: "string",
      title: "Client Type",
      description: "e.g., Startup, Enterprise, Personal",
    },
    {
      name: "category",
      type: "string",
      title: "Category",
      options: {
        list: [
          { title: "Freelance", value: "Freelance" },
          { title: "Machine Learning", value: "Machine Learning" },
          { title: "Hackathon Project", value: "Hackathon Project" },
          { title: "Software", value: "Software" },
          { title: "Java Application", value: "Java Application" },
          { title: "Python", value: "Python" },
        ],
      },
    },
    {
      name: "year",
      type: "string",
      title: "Year",
    },
    {
      name: "url",
      type: "url",
      title: "Live Website URL",
    },
    {
      name: "description",
      type: "text",
      title: "Short Description",
      description: "Shows on the homepage list",
    },
    {
      name: "image",
      type: "image",
      title: "Banner Image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "overview",
      type: "text",
      title: "Project Overview",
      rows: 5,
    },
    {
      name: "gallery",
      type: "array",
      title: "Project Snippets (Gallery)",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "2-3 snippets of the software/site",
    },
    {
      name: "outcome",
      type: "text",
      title: "Final Outcome",
      rows: 5,
    },
    {
      name: "order",
      type: "number",
      title: "Order",
      description: "Order to display the projects",
    },
  ],
}
