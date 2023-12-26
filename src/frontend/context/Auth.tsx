import React, { createContext, useContext, useState, useEffect } from "react"
import { AuthClient } from "@dfinity/auth-client"
import { HttpAgent } from "@dfinity/agent"
import type { Principal } from "@dfinity/principal"
import { createActor } from "../../declarations/backend/index"
import { backend } from "../../declarations/backend"
import { _SERVICE } from "../../declarations/backend/backend.did"
import { BACKEND_CANISTER_ID_IC } from "@/constants/constants"

// constants
import { APP_DERIVATION_ORIGIN } from "@/constants/constants"

// utils
import { isCustomDomain } from "@/utils/isCustomDomain"

const AuthContext = createContext(null)
const useAuth = () => {
  return useContext(AuthContext)
}

// note: .env variables change after deploy
// const IS_LOCAL_NETWORK = process.env.DFX_NETWORK === "local"
// const HOST = IS_LOCAL_NETWORK ? `http://localhost:5173` : "https://icp0.io"
const HOST = "https://icp0.io"
// const LOCAL_II = process.env.CANISTER_ID_INTERNET_IDENTITY
// const LOCAL_IDENTITY_PROVIDER = `http://127.0.0.1:4943/?canisterId=${LOCAL_II}`
// const IDENTITY_PROVIDER = IS_LOCAL_NETWORK ? LOCAL_IDENTITY_PROVIDER : "https://identity.ic0.app"
// const IDENTITY_PROVIDER = "https://identity.ic0.app"
// const CANISTER_ID = process.env.CANISTER_ID_BACKEND || process.env.BACKEND_CANISTER_ID

function AuthProvider({ children }) {
  const [signInLoading, setSignInLoading] = useState<boolean>(false)
  const [authClient, setAuthClient] = useState<AuthClient | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [userPrincipal, setUserPrincipal] = useState<Principal | null>(null)
  const [userId, setUserId] = useState<string>("")
  const [actor, setActor] = useState<_SERVICE>(null)

  const init = (): void => {
    resetii()
  }

  useEffect(() => {
    init()
  }, [])

  const resetii = async (): Promise<void> => {
    let authClient: AuthClient = null
    let isAuthenticated: boolean = false
    let userPrincipal: Principal = null
    let userId: string = ""
    let actor: _SERVICE = null

    // ...
    authClient = await AuthClient.create()
    isAuthenticated = await authClient.isAuthenticated()
    const identity = authClient.getIdentity()
    userPrincipal = identity.getPrincipal()
    userId = userPrincipal.toString()
    const agent = new HttpAgent({
      host: HOST,
      identity,
    })
    actor = createActor(BACKEND_CANISTER_ID_IC, {
      agent,
    })

    setAuthClient(authClient)
    setIsAuthenticated(isAuthenticated)
    setUserPrincipal(userPrincipal)
    setUserId(userId)
    setActor(actor)
  }

  const login = async (): Promise<void> => {
    if (isAuthenticated) throw new Error("already authed")

    setSignInLoading(true)
    authClient.login({
      // identityProvider: IDENTITY_PROVIDER,
      maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
      ...(isCustomDomain() && {
        derivationOrigin: APP_DERIVATION_ORIGIN,
      }),
      onSuccess: async () => {
        await resetii()
      },
    })
    setSignInLoading(false)
  }

  const logout = async (): Promise<void> => {
    if (!isAuthenticated) throw new Error("not authed")
    await authClient.logout()
    return resetii()
  }

  const value = {
    signInLoading,
    isAuthenticated,
    userPrincipal,
    userId,
    actor,
    backend,

    // ...
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { useAuth }
export default AuthProvider