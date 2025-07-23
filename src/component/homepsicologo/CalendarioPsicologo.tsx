import { useEffect, useState, forwardRef, useImperativeHandle } from "react"
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react"
import { createViewMonthAgenda } from "@schedule-x/calendar"
import { createEventsServicePlugin } from "@schedule-x/events-service"
import "@schedule-x/theme-default/dist/index.css"
import "/src/css/Calendario.css"
import { createEventModalPlugin } from "@schedule-x/event-modal"
import { fetchTokenScaduto } from "../../utilities/fetchTokenScaduto"

const eventsService = createEventsServicePlugin()
const eventModal = createEventModalPlugin()

const CalendarioPsicologo = forwardRef((props, ref) => {
  const [nessunEvento, setNessunEvento] = useState(false)

  const calendar = useCalendarApp({
    views: [createViewMonthAgenda()],
    plugins: [eventsService, eventModal],
  })

  const caricaEventiPsicologo = async () => {
    const token = localStorage.getItem("token")
    const payload = JSON.parse(atob(token.split(".")[1]))
    console.log("PAYLOAD", payload)
    try {
      const res = await fetchTokenScaduto(
        `${process.env.REACT_APP_BACKEND_URL}/richieste-appuntamento/psicologo/eventi`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log("RESPONSE", res)
      if (!res.ok) throw new Error("Errore nel caricamento eventi")

      const data = await res.json()
      const eventiFormattati = data.map((ev: any) => ({
        id: ev.id,
        title: ev.title,
        start: ev.start.split("T")[0],
        end: ev.end.split("T")[0],
        description: ev.description || "Nessuna descrizione",
      }))

      setNessunEvento(eventiFormattati.length === 0)
      eventsService.set(eventiFormattati)
    } catch (err) {
      console.error("Errore eventi psicologo:", err)
    }
  }

  useEffect(() => {
    caricaEventiPsicologo()
  }, [])

  useImperativeHandle(ref, () => ({
    refresh: caricaEventiPsicologo,
  }))

  return (
    <div className="my-3">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
})

export default CalendarioPsicologo
