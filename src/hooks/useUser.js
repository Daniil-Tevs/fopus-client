import { UserContext } from '/src/providers/UserProvider'
import { useContext } from 'react'

export const useUser = () => useContext(UserContext)
