import type { CollectionConfig } from "payload";

export const Participants: CollectionConfig = {
  slug: "participants",
  admin: {
    useAsTitle: "email",
    group: "Groups",
    defaultColumns: ["firstName", "lastName", "email", "phone", "gender"],
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
    {
      name: "gender",
      type: "select",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
      required: true,
    },
  ],
};
