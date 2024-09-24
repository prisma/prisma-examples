import { PostForm } from '@/components/PostSubmissionForm'

export default function Submit() {
  return (
    <>
      <div className="w-full h-16 flex flex-row bg-[#ff6600] items-center justify-start p-4 gap-4">
        <p className="text-lg font-extrabold text-black">Submit</p>
      </div>
      <div className="bg-[#f6f6ef] h-full w-full">
        <PostForm />
      </div>
    </>
  )
}
