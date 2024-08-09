// storage-adapter-import-placeholder
import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
// import sharp from 'sharp'

import { Groups } from "@/collections/Groups";
import { Media } from "@/collections/Media";
import { Mentors } from "@/collections/Mentors";
import { Participants } from "@/collections/Participants";
import { Users } from "@/collections/Users";
import { Logo, Icon } from "@/components/branding";
import { env } from "@/env";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    avatar: "gravatar",
    meta: {
      title: "Re:Generation Admin",
      titleSuffix: " - Regen Admin",
      description: "Administration site for Re:Generation Groups",
      icons: [{ rel: "icon", url: "/favicon.svg" }],
    },
    components: {
      graphics: {
        Logo,
        Icon,
      },
    },
  },
  collections: [Users, Media, Participants, Mentors, Groups],
  editor: lexicalEditor(),
  // email: resendAdapter({
  //   defaultFromAddress: env.EMAIL_FROM,
  //   defaultFromName: "Regen Admin",
  //   apiKey: env.EMAIL_SERVER_PASSWORD,
  // }),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
    schemaName: "regen",
  }),
  // sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
});
