import { createSchema } from "sanity"

export const project = {
  name: "project",
  type: "document",
  title: "Project",
  fields: [
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
      title: "URL",
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
    {
      name: "image",
      type: "image",
      title: "Project Image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "order",
      type: "number",
      title: "Order",
      description: "Order to display the projects",
    },
  ],
}
