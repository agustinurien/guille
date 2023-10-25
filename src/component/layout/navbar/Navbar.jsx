import { Link } from "react-router-dom"
import "./navbar.css"
import { useContext, useEffect, useState } from "react"
import { FuncionesContext } from "../../../context/FuncioinesContext"
import imagenC from "../../../assets/descarga.png"
import imagenI from "../../../assets/icbc.jpg"
import imagenP from "../../../assets/provincia.png"
import imagenV from "../../../assets/4068PME.jpg"
import { Settings } from "@mui/icons-material"
import Sidebar from "../../common/sideBar/Sidebar"



const Navbar = () => {
    const { elegirComision, market } = useContext(FuncionesContext)
    const [img, setImg] = useState(imagenC)

    const [sideBar, setSideBar] = useState(false)

    const toggleSidebar = () => {
        setSideBar(!sideBar)
    }
    useEffect(() => {
        if (market === "CIUDAD") {
            setImg(imagenC)
        } else if (market === "ICBC") {
            setImg(imagenI)
        } else if (market === "PROVINCIA") {
            setImg(imagenP)
        } else if (market === "VARIOS") {
            setImg(imagenV)
        }
    }, [market])

    return (
        <div className={market}>
            <div className="contenedorImagen">
                <img src={img} alt="tienda" />
            </div>

            <div className="nav">
                <div className="categoria">
                    <Link to={"/"} className="link-reset">Price-Calculator</Link>
                </div>
                <div className="categoria">
                    <Link to={"/Calculator"} className="link-reset">Calculator</Link>
                </div>

                <select className="select" onChange={(e) => elegirComision(e.target.value)}>
                    <option value="CIUDAD">Tienda Ciudad</option>
                    <option value="ICBC">ICBC</option>
                    <option value="PROVINCIA">Provincia</option>
                    <option value="VARIOS">Varios</option>
                    <option value="TODOS">Todos</option>
                </select>
                <button className="settingsButton" onClick={() => { setSideBar(!sideBar) }}><Settings className="settings" fontSize="larger" /></button>
            </div>
            <Sidebar sideBar={sideBar} toggleSidebar={toggleSidebar} />
        </div >
    )
}

export default Navbar
