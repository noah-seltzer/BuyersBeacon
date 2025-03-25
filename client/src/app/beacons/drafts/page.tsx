import DraftsPage from '@/components/organisms/beacons/drafts-page'
import { getUserSS } from '@/lib/user'
import { Suspense } from 'react'
import { Button } from '@/components/atoms/button'
import Link from 'next/link'
export default async function drafts() {
    try {
        const user = await getUserSS()
        return (
            <Suspense>
                <DraftsPage user={user} />
            </Suspense>
        )
    } catch {
        return (
            <div className='text-center py-8'>
                <p className='text-muted-foreground'>No drafts found</p>
                <Button className='mt-4' asChild>
                    <Link href='/beacons/create'>Create a Beacon</Link>
                </Button>
            </div>
        )
    }
}
