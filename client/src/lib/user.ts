import { User } from "@/types/user"
import { auth } from "@clerk/nextjs/server"

const DEFAULT_API_URL = 'http://localhost:5037/api/'

export const getUserSS = async () => {
    try {
        const { userId: clerkUserId, getToken } = await auth()
        const token = await getToken()

        if (!clerkUserId || !token) {
            throw new Error('Not Signed In')
        }

        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL

        const headers = new Headers()
        headers.set('Authorization', `Bearer ${token}`)

        let url = new URL('users/clerk/' + clerkUserId, apiBaseUrl)

        const beaconUserResponse = await fetch(url, {
            headers,
            cache: 'no-store' // Disable caching to ensure fresh data
        })

        let data;

        // If user not found, we need to create the user
        if (beaconUserResponse.status === 404) {
            const createResponse = await fetch(url, {
                method: 'POST',
                headers
            })

            if (!createResponse.ok) {
                throw new Error('Failed to create user')
            }

            data = await createResponse.json()
        } else if (beaconUserResponse.ok) {
            data = await beaconUserResponse.json()
        } else {
            throw new Error('Failed to get user')
        }

        if (!data || !data.UserId) {
            throw new Error('Invalid user data')
        }

        const user: User = {
            UserId: data.UserId,
            ClerkId: data.ClerkId,
            displayName: "",
            bio: "",
            location: "",
            joinedDate: new Date().toISOString()
        }

        return user
    } catch (error) {
        throw new Error('Authentication failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
}