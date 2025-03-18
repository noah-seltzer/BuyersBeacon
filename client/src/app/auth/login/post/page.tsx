import { auth } from '@clerk/nextjs/server'
import { FC } from 'react'
import SignInClientStateManager from '@/components/SignInClientState'
import { User } from '@/types/user'
import { getUserSS } from '../../../../lib/user'

const PostLoginPage: FC = async () => {
    try {
        const user = await getUserSS()
        return (
            <>
                <SignInClientStateManager user={user} redirectUrl="/" />
            </>
        )

    } catch {
        return <></>
    }
}

export default PostLoginPage
