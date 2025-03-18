'use client'

import { FC } from "react"
import { User } from "@/types/user"
import { useDispatch } from "react-redux"
import { setUser, setUserId } from "@/redux/auth-slice"
import { redirect } from "next/navigation"


export type SignInClientStateManagerProps = {user: User, redirectUrl?: string}

const SignInClientStateManager: FC<SignInClientStateManagerProps> = async ({ user, redirectUrl }) => {
    const dispatch = useDispatch()
    dispatch(setUserId(user.id))
    dispatch(setUser(user))
    if (redirectUrl) {
        redirect(redirectUrl)
    }
    return <></>
}

export default SignInClientStateManager