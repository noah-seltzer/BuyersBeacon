'use client'

import { FC, useEffect } from "react"
import { User } from "@/types/user"
import { useDispatch } from "react-redux"
import { setUser, setUserId } from "@/redux/auth-slice"
import { useRouter } from "next/navigation"

export type SignInClientStateManagerProps = {
  user: User;
  redirectUrl?: string;
}

const SignInClientStateManager: FC<SignInClientStateManagerProps> = ({ user, redirectUrl }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    
    useEffect(() => {
        dispatch(setUserId(user.id))
        dispatch(setUser(user))
        
        if (redirectUrl) {
            router.push(redirectUrl)
        }
    }, [dispatch, user, redirectUrl, router])

    return null
}

export default SignInClientStateManager