import { createContext, useContext, useEffect, useState } from "react"
import { registerTriggerExpiredModal } from "./fetchTokenScaduto"

interface AuthContextType {
  mostraModaleScadenza: boolean
  attivaModaleScadenza: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [mostraModaleScadenza, setMostraModaleScadenza] = useState(false)

  const attivaModaleScadenza = () => setMostraModaleScadenza(true)

  useEffect(() => {
    registerTriggerExpiredModal(attivaModaleScadenza)
  }, [])

  return (
    <AuthContext.Provider
      value={{ mostraModaleScadenza, attivaModaleScadenza }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const contesto = useContext(AuthContext)
  if (!contesto) {
    throw new Error("useAuth deve essere usato dentro AuthProvider")
  }
  return contesto
}
