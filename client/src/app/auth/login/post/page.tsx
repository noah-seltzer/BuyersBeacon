import { auth } from '@clerk/nextjs/server'
import { FC } from 'react'
import SignInClientStateManager from '@/components/SignInClientState'
import { User } from '@/types/user'

const PostLoginPage: FC = async () => {
    const { userId: clerkUserId, getToken } = await auth()
    const token = await getToken()
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
    console.log('data', data)
    return (
        <>
            <SignInClientStateManager user={user} redirectUrl="/" />
        </>
    )
}

export default PostLoginPage
