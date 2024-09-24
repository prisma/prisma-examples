'use client'

import { addVotes } from '@/app/actions/addVotes'
import { useEffect, useState } from 'react'

interface PostProps {
  id: number
  itemNo: number
  title: string
  url: string
  votes: number
}

export const Post = ({ itemNo, title, url, votes, id }: PostProps) => {
  useEffect(() => {}, [votes])

  const [vote, controlVote] = useState<number>(votes)

  const increaseVotes = async () => {
    try {
      await addVotes(id)
      controlVote((prev) => prev + 1)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full flex flex-col">
      <p className="text-black">
        {`${itemNo}. `}
        <button className="text-slate-400" onClick={increaseVotes}>
          ▲
        </button>{' '}
        {title}{' '}
        <span className="text-sm text-slate-600 hover:underline">
          <a href={url} target="_blank">{`(${url})`}</a>
        </span>
      </p>
      <p className="text-slate-600 text-sm pl-10">{vote} points</p>
    </div>
  )
}
