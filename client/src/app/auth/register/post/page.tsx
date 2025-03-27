
import { auth } from "@clerk/nextjs/server";
import { FC, Suspense } from "react";
import { User } from '@/types/user'
import SignInClientStateManager from '@/components/SignInClientState'

const PostRegisterPage: FC = async () => {
    const { userId: clerkUserId, getToken } = await auth()

    const token = await getToken()
    console.log(token);
    const headers = new Headers()
    headers.set('Authorization', `Bearer ${token}`)
    headers.set("Content-Type", "application/json")
    const beaconUser = await fetch(
        process.env.API_URL + 'users/clerk/' + clerkUserId,
        {
            headers,
            method: 'POST',
        }
    )


    console.log(process.env.API_URL + 'users/clerk/' + clerkUserId);

    console.log(beaconUser.status);

    const data = await beaconUser.json()
    const user: User = {
        UserId: data.UserId,
        ClerkId: data.ClerkId
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