import { User } from "@/types/user"
import { auth } from "@clerk/nextjs/server"

export const getUserSS = async () => {
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
    const user: User = {
        id: data.userId,
        clerk_user_id: data.clerkId
    }
    return user
}