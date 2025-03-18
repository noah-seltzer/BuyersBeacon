'use client'
import { FC, PropsWithChildren } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastContainer } from 'react-toastify'
import SignInStateManager from './SignInStateManager'

const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Provider store={store}>
            <ClerkProvider signInFallbackRedirectUrl='/auth' publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='dark'
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    {/* <SignInStateManager /> */}
                    <ToastContainer />
                    <Navbar />
                    <main className='pt-16'>{children}</main>
                </ThemeProvider>
            </ClerkProvider>
        </Provider>
    )
}

export default Providers
