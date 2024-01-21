import { ReactNode } from 'react'

export default function InfoContainer({ children }: { children: ReactNode }) {
    return (
        <div className='mx-auto border-primary border-2 bg-[#6395e140] max-w-96 p-3 h-fit rounded-2xl'>
            {children}
        </div>
    )
}
