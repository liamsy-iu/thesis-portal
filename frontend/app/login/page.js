'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Simple password check
    if (password === process.env.NEXT_PUBLIC_PASSWORD) {
      // Set auth cookie
      document.cookie = `thesis-auth=${process.env.NEXT_PUBLIC_AUTH_TOKEN}; path=/; max-age=2592000` // 30 days
      router.push('/')
    } else {
      setError('Incorrect password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center font-crimson">
          Thesis Research Portal
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-secondary mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-secondary border border-theme text-primary"
              placeholder="Enter password"
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent-dark text-white py-2 rounded font-medium"
          >
            Access Portal
          </button>
        </form>
      </div>
    </div>
  )
}
