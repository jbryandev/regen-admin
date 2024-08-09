import type { CollectionConfig } from "payload";

export const Mentors: CollectionConfig = {
  slug: "mentors",
  admin: {
    useAsTitle: "email",
    group: "Groups",
    defaultColumns: ["firstName", "lastName", "email", "phone"],
  },
  defaultSort: "lastName",
  fields: [
    {
      name: "firstName",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      required: true,
    },
  ],
};
