import React, { ReactNode } from 'react'

export default function Explication({ children }: { children: ReactNode }) {
    return (
        <div className='border-primary border-2 bg-light p-1 absolute bottom-5 left-1/2 -translate-x-1/2 rounded-2xl hidden'>
            {children}
        </div>
    )
}
