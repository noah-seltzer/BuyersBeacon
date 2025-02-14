'use client'

import { useTheme } from 'next-themes'
import Link from 'next/link'
import { Button } from './atoms/button'
import { Moon, Sun, Search, Menu, X, Bell } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { SignedOut, SignIn, SignUp, SignedIn, UserButton, SignInButton, SignUpButton } from '@clerk/nextjs'

export function Navbar() {
    const { theme, setTheme } = useTheme()
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const NavLink = ({
        href,
        children,
        onClick
    }: {
        href: string
        children: React.ReactNode
        onClick?: () => void
    }) => {
        const isActive = pathname === href
        return (
            <Link
                href={href}
                onClick={onClick}
                className={cn(
                    'text-sm text-foreground/80 hover:text-foreground relative py-1',
                    "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:rounded-full",
                    'after:bg-primary after:transition-transform after:duration-200',
                    isActive
                        ? 'text-foreground after:scale-x-100'
                        : 'after:scale-x-0 hover:after:scale-x-100'
                )}
            >
                {children}
            </Link>
        )
    }

    return (
        <nav className='fixed top-0 w-full bg-background border-b border-surface/10 z-50'>
            <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
                <div className='flex items-center gap-8'>
                    <Link href='/' className='text-2xl font-bold text-primary'>
                        BuyersBeacon
                    </Link>
                    <div className='hidden md:flex items-center gap-6'>
                        <NavLink href='/browse'>Browse</NavLink>
                        <NavLink href='/categories'>Categories</NavLink>
                        <NavLink href='/about'>About</NavLink>
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <Button
                        variant='ghost'
                        size='icon'
                        className='text-foreground/80'
                    >
                        <Search className='h-5 w-5' />
                    </Button>
                    <Button
                        variant='ghost'
                        size='icon'
                        className='text-foreground/80'
                    >
                        <Bell className='h-5 w-5' />
                    </Button>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={() =>
                            setTheme(theme === 'dark' ? 'light' : 'dark')
                        }
                        className='text-foreground/80'
                    >
                        {theme === 'dark' ? (
                            <Sun className='h-5 w-5' />
                        ) : (
                            <Moon className='h-5 w-5' />
                        )}
                    </Button>
                    <SignedOut>
                        <SignInButton>
                        <Button
                            variant='default'
                            className='bg-tertiary hover:bg-primary/90 text-white hidden md:flex'
                        >
                            Sign In
                        </Button>
                        </SignInButton>
                        <SignUpButton>
                        <Button
                            variant='default'
                            className='bg-secondary hover:bg-primary/90 text-white hidden md:flex'
                        >
                            Sign Up
                        </Button>
                        </SignUpButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <Link href='/beacons/create' className='btn btn-primary'>
                        <Button
                            variant='default'
                            className='bg-primary hover:bg-primary/90 text-white hidden md:flex'
                        >
                            Post Beacon
                        </Button>
                    </Link>
                    <Button
                        variant='ghost'
                        size='icon'
                        className='md:hidden'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className='h-5 w-5' />
                        ) : (
                            <Menu className='h-5 w-5' />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    'md:hidden fixed inset-x-0 bg-background border-b border-surface/10 transition-all duration-300 ease-in-out',
                    isMenuOpen ? 'top-16 opacity-100' : '-top-96 opacity-0'
                )}
            >
                <div className='container mx-auto px-4 py-4 flex flex-col gap-4'>
                    <NavLink
                        href='/beacons/browse'
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Browse
                    </NavLink>
                    <NavLink
                        href='/categories'
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Categories
                    </NavLink>
                    <NavLink href='/about' onClick={() => setIsMenuOpen(false)}>
                        About
                    </NavLink>
                    <Link href='/beacons/create' className='btn btn-primary'>
                        <Button
                            variant='default'
                            className='bg-primary hover:bg-primary/90 text-white w-full mt-2'
                        >
                            Post Beacon
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
