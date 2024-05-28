import { z } from 'zod'

export const productFormSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string().min(4, {
    message: 'Description must be at least 4 characters.',
  }),
  stock: z.coerce.number().min(1, {
    message: 'Stock must be greater than 0.',
  }),
})

export type ProductInputType = z.infer<typeof productFormSchema>
