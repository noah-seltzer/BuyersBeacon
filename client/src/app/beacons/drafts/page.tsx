import DraftsPage from '@/components/organisms/beacons/drafts-page'
import { getUserSS } from '@/lib/user'
import { User } from '../../../types/user'
import { auth } from '@clerk/nextjs/server'
import { Suspense } from 'react'
export default async function drafts() {
    try {
            const { userId: clerkUserId, getToken } = await auth()
            const token = await getToken()
            if (!clerkUserId || !token) {
                throw new Error('Not Signed In')
            }
            const headers = new Headers()
            headers.set('Authorization', `Bearer ${token}`)
            const beaconUser = await fetch(
                process.env.API_URL + 'users/clerk/' + clerkUserId,
                {
                    headers
                }
            )
            const data = await beaconUser.json()
            console.log('data', data)
            const user: User = {
                id: data.userId,
                clerk_user_id: data.clerkId
            }
            console.log('user', user)
        return <Suspense>
            <DraftsPage user={user} />
        </Suspense>

    } catch {
        return <></>
    }
}
