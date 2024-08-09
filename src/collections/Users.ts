import type { CollectionConfig } from "payload";

import { canAccess, canUpdate, isAdmin } from "@/lib/payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    group: "Admin",
    defaultColumns: ["firstName", "lastName", "email", "phone", "role"],
  },
  auth: true,
  access: {
    read: canAccess,
    unlock: isAdmin,
  },
  defaultSort: "lastName",
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      required: true,
      access: {
        read: () => true,
      },
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      required: true,
      access: {
        read: () => true,
      },
    },
    // {
    //   name: "fullName",
    //   type: "text",
    //   admin: {
    //     hidden: true,
    //   },
    //   hooks: {
    //     beforeChange: [
    //       ({ siblingData }) => {
    //         // ensures data is not stored in DB
    //         delete siblingData.fullName;
    //       },
    //     ],
    //     afterRead: [
    //       ({ data }) => {
    //         return `${data?.firstName} ${data?.lastName}`;
    //       },
    //     ],
    //   },
    // },
    {
      name: "phone",
      type: "text",
      required: true,
      access: {
        read: () => true,
      },
    },
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
      access: {
        read: () => true,
        update: canUpdate,
      },
    },
  ],
};
