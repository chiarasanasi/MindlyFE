export async function fetchTokenScaduto(
  url: string,
  options: RequestInit = {},
  onUnauthorized?: () => void
): Promise<Response> {
  const token = localStorage.getItem("token")

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (response.status === 401) {
    // Notifica il componente che sta per fare il redirect
    if (onUnauthorized) onUnauthorized()

    // Ritarda il redirect di 2.5 secondi per mostrare la modale
    setTimeout(() => {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }, 2500)

    return Promise.reject("Token scaduto o non valido")
  }

  return response
}
