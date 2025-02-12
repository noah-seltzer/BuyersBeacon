'use client'
import { FC, PropsWithChildren } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Provider store={store}>
            <ThemeProvider
                attribute='class'
                defaultTheme='dark'
                enableSystem={false}
                disableTransitionOnChange
            >
                <Navbar />
                <main className='pt-16'>{children}</main>
            </ThemeProvider>
        </Provider>
    )
}

export default Providers
