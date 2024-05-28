import { AuthContext } from '/src/providers/AuthProvider'
import { useContext } from 'react'

export const useAuth = () => useContext(AuthContext)
