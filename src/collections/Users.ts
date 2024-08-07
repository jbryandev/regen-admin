import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Director", value: "director" },
        { label: "Coach", value: "coach" },
        { label: "Leader", value: "leader" },
        { label: "Tech", value: "tech" },
      ],
      required: true,
      defaultValue: "leader",
    },
  ],
};
