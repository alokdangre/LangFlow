'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { 
  UserIcon, 
  LogOutIcon, 
  SettingsIcon, 
  CreditCardIcon,
  ChevronDownIcon 
} from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                href="/" 
                className="text-xl font-bold text-white hover:text-indigo-200 transition-colors duration-300 transform hover:scale-105"
              >
                LangFlow
              </Link>
            </div>
            {session && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/dashboard"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 ${
                    isActive('/dashboard')
                      ? 'border-white text-white'
                      : 'border-transparent text-indigo-100 hover:text-white hover:border-white'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/workspace"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300 ${
                    isActive('/workspace')
                      ? 'border-white text-white'
                      : 'border-transparent text-indigo-100 hover:text-white hover:border-white'
                  }`}
                >
                  Workspace
                </Link>
              </div>
            )}
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {status === 'loading' ? (
              <div className="animate-pulse bg-white/20 rounded-full h-8 w-20"></div>
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-full text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || ''}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <UserIcon className="w-6 h-6" />
                  )}
                  <span className="text-sm font-medium">{session.user.name}</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="font-medium">{session.user.name}</div>
                      <div className="text-gray-500">{session.user.email}</div>
                      <div className="text-xs text-blue-600 font-medium mt-1">
                        Free Plan
                      </div>
                    </div>
                    
                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <SettingsIcon className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                    
                    <Link
                      href="/billing"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <CreditCardIcon className="w-4 h-4 mr-2" />
                      Billing
                    </Link>
                    
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOutIcon className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/signin"
                  className="text-indigo-100 hover:text-white text-sm font-medium transition-colors duration-300"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-white text-indigo-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 transition-colors duration-300"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </nav>
  )
}
