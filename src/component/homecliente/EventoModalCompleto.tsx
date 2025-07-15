const EventModalCompleto = ({ calendarEvent }: any) => {
  const startDate = new Date(calendarEvent.start)
  const endDate = new Date(calendarEvent.end)

  const formattedDate = startDate.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const formattedStartTime = startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  const formattedEndTime = endDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="mt-3">
      <p>
        <strong>Data:</strong> {formattedDate}
      </p>
      <p>
        <strong>Ora inizio:</strong> {formattedStartTime}
      </p>
      <p>
        <strong>Ora fine:</strong> {formattedEndTime}
      </p>
      <p>
        <strong>Messaggio:</strong>{" "}
        {calendarEvent.description || "Nessuna descrizione"}
      </p>
    </div>
  )
}

export default EventModalCompleto
