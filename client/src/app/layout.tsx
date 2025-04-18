import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { PropsWithChildren, FC } from 'react'
import Providers from '@/components/providers'
import { ThemeProvider } from 'next-themes'
import { Toaster } from "@/components/atoms/toaster"

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: 'BuyersBeacon',
    description: 'Connect with buyers and sellers in your area'
}

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <html lang='en' suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute='class'
                    defaultTheme='dark'
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <Providers>{children}</Providers>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}

export default RootLayout
