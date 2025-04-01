
import { auth } from "@clerk/nextjs/server";
import { FC, Suspense } from "react";
import { User } from '@/types/user'
import SignInClientStateManager from '@/components/SignInClientState'

const PostRegisterPage: FC = async () => {
    const { userId: clerkUserId, getToken } = await auth()
    const token = await getToken()
    const headers = new Headers()
    headers.set('Authorization', `Bearer ${token}`)
    headers.set("Content-Type", "application/json")
    const beaconUser = await fetch(
        process.env.NEXT_PUBLIC_API_URL + 'users/clerk/' + clerkUserId,
        {
            headers,
            method: 'POST',
        }
    )

    const data = await beaconUser.json()
    const user: User = {
        id: data.userId,
        clerk_user_id: data.clerkId,
        displayName: "",
        bio: "",
        location: "",
        joinedDate: ""
    }
    return (
        <>
            <Suspense>
                <SignInClientStateManager user={user} redirectUrl="/" />
            </Suspense>
        </>
    )
}

export default PostRegisterPage