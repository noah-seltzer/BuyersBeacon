'use client'
import { FC, PropsWithChildren } from 'react'
import { Navbar } from '@/components/navbar'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastContainer } from 'react-toastify'

const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Provider store={store}>
            <ClerkProvider signInFallbackRedirectUrl='/auth' publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
                    <ToastContainer />
                    <Navbar />
                    <main className='pt-16'>{children}</main>
            </ClerkProvider>
        </Provider>
    )
}

export default Providers
