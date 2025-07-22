let attivatoreModaleGlobale: (() => void) | null = null

export const registerTriggerExpiredModal = (fn: () => void) => {
  attivatoreModaleGlobale = fn
}

export async function fetchTokenScaduto(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem("token")

  const intestazioni = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }

  const risposta = await fetch(url, {
    ...options,
    headers: intestazioni,
  })

  if (risposta.status === 401 || risposta.status === 403) {
    if (attivatoreModaleGlobale) attivatoreModaleGlobale()
    return Promise.reject("Token scaduto o non valido")
  }

  return risposta
}
