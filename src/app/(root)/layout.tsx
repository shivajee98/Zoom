import React from 'react'


interface RootProps {
    children: React.ReactNode
}

const RootLayout = ({children}: RootProps) => {
  return (
    <main>
        {children}
    </main>
  )
}

export default RootLayout
