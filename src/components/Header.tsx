import { ReactNode } from "react"

export default function Header({ children }: { children: ReactNode }) {
    return (
        <header className='bg-primary h-20 flex justify-between items-center sm:px-24 px-5 gap-10'>
            <h1 className='font-semibold text-white text-2xl uppercase'>
                CLima
            </h1>
            <div>
            { children }
        </div>
        </header >
    )
}
