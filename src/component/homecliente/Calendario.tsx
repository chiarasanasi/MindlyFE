import { useState, useEffect } from "react"
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react"
import { createViewMonthAgenda } from "@schedule-x/calendar"
import { createEventsServicePlugin } from "@schedule-x/events-service"
import "@schedule-x/theme-default/dist/index.css"
import "/src/css/Calendario.css"
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useLocation } from "react-router-dom"
import { createEventModalPlugin } from "@schedule-x/event-modal"

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
      const res = await fetch(
        "http://localhost:8080/richieste-appuntamento/eventi",
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

      // setEventi(eventiFormattati)
      console.log(eventiFormattati)
      // setCaricati(true)
      eventsService.set(eventiFormattati)
    } catch (err) {
      console.error("Errore eventi:", err)
    }
  }

  useEffect(() => {
    caricaEventi()
  }, [])

  // ===================== FORM PER LA RICHIESTA =====================

  const [data, setData] = useState("")
  const [ora, setOra] = useState("")
  const [messaggio, setMessaggio] = useState("")
  const [successo, setSuccesso] = useState(false)
  const [errore, setErrore] = useState(false)

  const inviaRichiesta = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem("token")

    try {
      const res = await fetch("http://localhost:8080/richieste-appuntamento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data, ora, messaggio }),
      })

      if (!res.ok) throw new Error("Errore nella richiesta")

      setSuccesso(true)
      setErrore(false)
      setData("")
      setOra("")
      setMessaggio("")
      caricaEventi()
    } catch (err) {
      console.error(err)
      setErrore(true)
      setSuccesso(false)
    }
  }

  return (
    <div>
      <div className="my-3">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </div>
  )
}

export default Calendario
