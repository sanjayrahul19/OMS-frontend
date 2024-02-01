import { ReactNode } from "react"

export const metadata = {
    title: 'Hr Login',
    description: 'This is Hr Login page for sparkout tech solutions',
    keywords: "Hr Login sparkout tech solutions"
}

interface RootLayoutProps {
    children: ReactNode;
  }

export default function RootLayout({ children }:RootLayoutProps) {
    return (
        <div>
            {children}
        </div>
    )
}
