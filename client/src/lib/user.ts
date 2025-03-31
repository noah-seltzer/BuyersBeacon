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
        process.env.NEXT_PUBLIC_API_URL + 'users/clerk/' + clerkUserId,
        {
            headers
        }
    )

    const data = await beaconUser.json()
    console.log("BEACON USER", data);
    const user: User = {
        UserId: data.UserId,
        ClerkId: data.ClerkId,
        displayName: "",
        bio: "",
        location: "",
        joinedDate: ""
    }
    return user
}