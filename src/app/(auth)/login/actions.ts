"use server";

import { getPayloadHMR } from "@payloadcms/next/utilities";

import { type LoginFormData } from "@/lib/types";
import config from "@payload-config";

export const login = async (data: LoginFormData) => {
  const payload = await getPayloadHMR({
    config,
  });

  const result = await payload.login({
    collection: "users",
    data,
    depth: 2,
    locale: "en",
    fallbackLocale: "en",
    overrideAccess: false,
    showHiddenFields: true,
  });

  return result;
};
