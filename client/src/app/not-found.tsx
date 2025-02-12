import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import { FC } from 'react'
const NotFound: FC = () => (
    <div className='min-h-[calc(100vh-4rem)] flex items-center justify-center'>
        <div className='container mx-auto px-4 text-center'>
            <div className='relative'>
                <div className='text-[12rem] md:text-[20rem] font-bold text-primary/10 leading-none select-none'>
                    404
                </div>

                <div className='absolute inset-0 flex items-center justify-center flex-col'>
                    <h1 className='text-4xl md:text-6xl font-bold mb-4'>
                        Beacon Lost in Space
                    </h1>
                    <p className='text-lg text-foreground/80 mb-8 max-w-md'>
                        The page you're looking for seems to have drifted away.
                        Let's help you find your way back.
                    </p>
                    <Button
                        asChild
                        size='lg'
                        className='bg-primary hover:bg-primary/90'
                    >
                        <Link href='/'>
                            <Home className='mr-2' />
                            Return Home
                        </Link>
                    </Button>
                </div>
            </div>

            <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping' />
                <div className='absolute top-1/3 right-1/3 w-2 h-2 bg-secondary rounded-full animate-ping [animation-delay:0.2s]' />
                <div className='absolute bottom-1/3 left-1/3 w-2 h-2 bg-tertiary rounded-full animate-ping [animation-delay:0.4s]' />
            </div>
        </div>
    </div>
)
export default NotFound
