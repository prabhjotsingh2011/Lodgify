

import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/Navbar/Navbar'
import Modal from './components/modals/Modal'
import Register from './components/modals/Register'
import ToasterProvider from './providers/ToasterProvider'
import Login from './components/modals/Login'
import getCurrentUser from './actions/getCurrentUser'
import { SessionProvider, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import AuthProvider from './context/AuthProvider'
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SearchModal'
// import { Inter } from 'next/font/google'

const inter = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lodgify',
  description: 'Book unique homes and experiences all over the world.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();
  console.log('currentUser', currentUser);
  // const currentUser = getServerSession(authOptions);
  // console.log('currentUser', currentUser);
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AuthProvider> */}

          <ToasterProvider />
          <Login />
          <RentModal />
          <SearchModal />

          <Register />
          <Navbar currentUser={currentUser}/>
          <div className='pb-20 pt-28'>

            {children}
          </div>

        {/* </AuthProvider> */}


      </body>
    </html>
  )
}
