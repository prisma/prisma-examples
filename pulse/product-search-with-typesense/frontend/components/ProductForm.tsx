'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { productFormSchema, ProductInputType } from '@/lib/types'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { environmentVariables } from '@/lib/variables'

export function ProductForm() {
  const { toast } = useToast()

  const form = useForm<ProductInputType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: '',
      description: '',
      stock: 10,
    },
  })

  async function onSubmit(values: ProductInputType) {
    try {
      await fetch(`${environmentVariables.BACKEND_URL}/add-product`, {
        headers: {
          'Content-Type': 'Application/json',
        },
        method: 'POST',
        body: JSON.stringify(values),
      })

      toast({
        title: 'Successfully added a new product!',
      })

      form.reset()
    } catch (error) {
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-[75%] rounded-md border-black p-4 md:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product title</FormLabel>
                  <FormControl>
                    <Input placeholder="Instaflix-360 Webcam" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="The best AI-powered webcam in the market."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product stock</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export function ProductDialog() {
  return (
    <div className="pt-8">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add a new product 📦</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <ProductForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}
