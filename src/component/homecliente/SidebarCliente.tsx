import { CSidebar, CSidebarNav, CNavItem, CNavTitle } from "@coreui/react"

import CIcon from "@coreui/icons-react"
import {
  cilVoiceOverRecord,
  cilCalendar,
  cilUser,
  cilSortAscending,
  cilLibrary,
} from "@coreui/icons"

import "/src/css/Mindly.css"
import "/src/css/SideBar.css"

import { Link } from "react-router-dom"

type Props = {
  cliente: any
}

const SidebarCliente = ({ cliente }: Props) => {
  const username = cliente.username

  return (
    <CSidebar className="border-end" unfoldable>
      <CSidebarNav>
        <CNavTitle>Ciao {cliente.nome} !</CNavTitle>
        <CNavItem href={`/cliente/${cliente.username}/home`}>
          <CIcon customClassName="nav-icon" icon={cilUser} /> Profilo
        </CNavItem>
        <CNavItem href={`/cliente/${cliente.username}/diario`}>
          <CIcon customClassName="nav-icon" icon={cilLibrary} /> Il mio Diario
        </CNavItem>
        <CNavItem href={`/cliente/${cliente.username}/calendario`}>
          <CIcon customClassName="nav-icon" icon={cilCalendar} /> Calendario
        </CNavItem>
        <CNavItem href="https://coreui.io/pro/">
          <CIcon customClassName="nav-icon" icon={cilVoiceOverRecord} /> Il mio
          Psicologo
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  )
}

export default SidebarCliente
