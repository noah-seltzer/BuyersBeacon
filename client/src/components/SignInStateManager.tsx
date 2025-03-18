import { useAuth, useUser } from "@clerk/nextjs"
// import { auth, currentUser } from "@clerk/nextjs/server"
import { FC } from "react"
import { setUserId } from "../redux/auth-slice"
import { useDispatch } from "react-redux"


const SignInStateManager: FC = async () => {
    return <></>
    // const dispatch = useDispatch()
    // // const user = await currentUser()
    // const {user, isSignedIn} = useUser()
    // if (user) {
    //     console.log('user', user)
    //     dispatch(setUserId(user.id))
    // } else {
    //     console.log('not signed in')
    // }

    
    // return <></>
}

export default SignInStateManager