import { createServerFn } from "@tanstack/react-start";

import { createEnquiry, enquirySchema } from "./enquiries.server";

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => createEnquiry(data));