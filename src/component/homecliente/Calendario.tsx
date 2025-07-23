import { useState, useEffect } from "react"
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react"
import { createViewMonthAgenda } from "@schedule-x/calendar"
import { createEventsServicePlugin } from "@schedule-x/events-service"
import "@schedule-x/theme-default/dist/index.css"
import "/src/css/Calendario.css"
import { createEventModalPlugin } from "@schedule-x/event-modal"
import { fetchTokenScaduto } from "../../utilities/fetchTokenScaduto"

const Calendario = () => {
  const eventsService = createEventsServicePlugin()
  const eventModal = createEventModalPlugin()

  const calendar = useCalendarApp({
    views: [createViewMonthAgenda()],
    plugins: [eventsService, eventModal, createEventModalPlugin],
  })

  const caricaEventi = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetchTokenScaduto(
        `${import.meta.env.VITE_BACKEND_URL}/richieste-appuntamento/eventi`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (!res.ok) throw new Error("Errore nel caricamento eventi")
      const data = await res.json()

      const eventiFormattati = data.map((ev: any) => ({
        id: ev.id,
        title: ev.title,
        start: ev.start.split("T")[0],
        end: ev.end.split("T")[0],
        description: ev.description || "Nessun messaggio",
      }))

      eventsService.set(eventiFormattati)
    } catch (err) {
      console.error("Errore eventi:", err)
    }
  }

  useEffect(() => {
    caricaEventi()
  }, [])

  return (
    <div>
      <div className="my-3">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </div>
  )
}

export default Calendario
