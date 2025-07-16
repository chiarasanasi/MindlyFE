import { CSidebar, CSidebarNav, CNavItem, CNavTitle } from "@coreui/react"

import CIcon from "@coreui/icons-react"
import {
  cilVoiceOverRecord,
  cilCalendar,
  cilUser,
  cilLibrary,
} from "@coreui/icons"

import "/src/css/Mindly.css"
import "/src/css/SideBar.css"
import { jwtDecode } from "jwt-decode"
import { useState } from "react"

const SidebarCliente = () => {
  interface DecodedToken {
    username: string
  }
  const [sidebarVisible, setSidebarVisible] = useState(true)

  const token = localStorage.getItem("token")
  let username = ""

  if (token) {
    const decoded: DecodedToken = jwtDecode(token)
    username = decoded.username
  }
  return (
    <CSidebar className="border-end" unfoldable visible={sidebarVisible}>
      <CSidebarNav>
        <CNavTitle>Ciao {username} !</CNavTitle>
        <CNavItem href={`/cliente/${username}/home`}>
          <CIcon customClassName="nav-icon" icon={cilUser} /> Profilo
        </CNavItem>
        <CNavItem href={`/cliente/${username}/diario`}>
          <CIcon customClassName="nav-icon" icon={cilLibrary} /> Il mio Diario
        </CNavItem>
        <CNavItem href={`/cliente/${username}/calendario`}>
          <CIcon customClassName="nav-icon" icon={cilCalendar} /> Calendario
        </CNavItem>
        <CNavItem href={`/cliente/${username}/psicologo`}>
          <CIcon customClassName="nav-icon" icon={cilVoiceOverRecord} /> Il mio
          Psicologo
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  )
}

export default SidebarCliente
