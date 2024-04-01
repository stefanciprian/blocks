// validationSchema.ts
import { z } from 'zod';

export const uploadFormSchema = z.object({
    file: z
        .instanceof(File, { message: "Invalid file" })
        .optional()
        .nullable(),
});
