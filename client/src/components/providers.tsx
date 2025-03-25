'use client'
import { FC, PropsWithChildren } from 'react'
import { Navbar } from '@/components/navbar'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastContainer } from 'react-toastify'
import { ChatModalEngine, ChatModalProvider } from './providers/chat-provider'

const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Provider store={store}>
            <ClerkProvider signInFallbackRedirectUrl='/auth' publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
                <ChatModalProvider>
                    <ChatModalEngine />
                    <ToastContainer />
                    <Navbar />
                    <main className='pt-16'>{children}</main>
                </ChatModalProvider>
            </ClerkProvider>
        </Provider>
    )
}

export default Providers
