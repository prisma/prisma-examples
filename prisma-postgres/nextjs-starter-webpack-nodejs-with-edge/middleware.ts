import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db-edge'

export async function middleware(request: NextRequest) {
  console.log('Running middleware for database connectivity check...')
  
  // Set a timeout of 500ms
  const msTreshold = 500

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Database timeout')), msTreshold)
  })

  try {
    // Simple database connectivity check
    const dbCheckPromise = prisma.$queryRaw`SELECT 1`

    // Race between the database check and timeout
    await Promise.race([dbCheckPromise, timeoutPromise])

    // If we get here, database is available
    return NextResponse.next()
  } catch (error) {
    // Database is not available or timeout occurred
    console.error('Database connectivity check failed:', error)
    
    // Return 500 error
    return new NextResponse(`Database unavailable, did not get a response in ${msTreshold} ms`, { 
      status: 500,
      statusText: 'Internal Server Error'
    })
  }
}

export const config = {
  // Only run middleware on the home page where Quotes component is rendered
  matcher: '/'
}
