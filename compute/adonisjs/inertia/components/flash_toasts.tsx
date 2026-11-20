import { useEffect } from 'react'
import { toast, Toaster } from 'sonner'
import { router, usePage } from '@inertiajs/react'
import { CircleAlert, CircleCheck } from 'lucide-react'

export default function FlashToasts() {
  const { flash } = usePage()

  useEffect(() => {
    return router.on('start', () => toast.dismiss('flash'))
  }, [])

  useEffect(() => {
    if (flash.error) toast.error(flash.error, { id: 'flash' })
    if (flash.success) toast.success(flash.success, { id: 'flash' })
  }, [flash])

  return (
    <Toaster
      position="top-center"
      toastOptions={{ unstyled: true }}
      icons={{
        success: <CircleCheck size={18} strokeWidth={1.8} />,
        error: <CircleAlert size={18} strokeWidth={1.8} />,
      }}
    />
  )
}
