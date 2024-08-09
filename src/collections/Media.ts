import type { Access, CollectionConfig } from "payload";

const isAdmin: Access = ({ req: { user } }) => user?.role === "admin";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Admin",
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
