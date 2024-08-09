import type { CollectionConfig } from "payload";

export const Groups: CollectionConfig = {
  slug: "groups",
  admin: {
    useAsTitle: "name",
    group: "Groups",
  },
  defaultSort: "lastName",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "gender",
      type: "select",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
      required: true,
    },
    {
      name: "launchDate",
      type: "date",
      required: true,
    },
  ],
};
