import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { routes } from './Routes'
import { AuthProvider } from './pages/auth/AuthContext'

function App() {
  return (
    <div>
      <AuthProvider>
      <RouterProvider router={routes} />
      </AuthProvider>
    </div>
  )
}

export default App