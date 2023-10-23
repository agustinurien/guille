import { useContext } from "react";
import { FuncionesContext } from "../../../context/FuncioinesContext";
import { useState } from "react";
import { Add, CheckCircleOutline, Close, Create, KeyboardArrowRight, RemoveCircleOutline } from "@mui/icons-material"
import { motion } from "framer-motion"
import "./sidebar.css"
import Swal from "sweetalert2";


const Sidebar = ({ sideBar, toggleSidebar }) => {

    const { valoresComisiones } = useContext(FuncionesContext)

    const costosEnvio = [

    ];

    const [editar, setEditar] = useState(false)

    const [agregar, setAgregar] = useState(false)

    const [desplegar, setDesplegar] = useState({
        markets: false,
        costoEnvio: false,
    })

    const handleClickOpen = () => {
        Swal.fire({
            title: 'Deseas guardar los cambios?',
            showCancelButton: true,
            showDenyButton: false,
            cancelButtonText: `Cancelar`,
            confirmButtonText: 'Guardar',
        }).then((result) => {
            if (result.isConfirmed) {
                setAgregar(false)
                saveValue()
            }
        })
    };
    const handleChangeValue = () => {
        Swal.fire({
            title: 'Deseas guardar los cambios?',
            showCancelButton: true,
            showDenyButton: false,
            cancelButtonText: `Cancelar`,
            confirmButtonText: 'Guardar',
        }).then((result) => {
            if (result.isConfirmed) {
                setEditar(!editar)
                changeValue()
            }
        })
    };


    const toggleDesplegar = (topic) => {
        setDesplegar((prevDesplegar) => ({
            ...prevDesplegar,
            [topic]: !prevDesplegar[topic],
        }))
    }

    const [inputValues, setInputValues] = useState(valoresComisiones.map((element => element.value * 100)))

    const [selectedMarkets, setSelectedMarkets] = useState([])

    const handleInputChange = (index, newValue) => {
        const numberValue = parseFloat(newValue);

        const newInputValues = [...inputValues];
        newInputValues[index] = numberValue;
        setInputValues(newInputValues);
    };

    const cancelarChangeValue = () => {
        const valoresOriginales = valoresComisiones.map((element => element.value * 100))
        setInputValues(valoresOriginales)
    }
    const changeValue = () => {
        console.log(inputValues) // hacer un push para cambiar los datos, le paso un numero entero, deberia dividirlo en 100
    }

    const [label, setLabel] = useState("")
    const [valueMkp, setValueMkp] = useState(0)
    const [newData, setNewData] = useState("")

    const saveValue = () => {
        if (label && !isNaN(valueMkp)) {
            const newItem = { label: label, value: Number(valueMkp) }
            setNewData([...newData, newItem])
            setLabel("")
            setValueMkp(0)
        }
        // enviar la data como json al py
    }

    const toggleEliminar = (marketLabel) => {
        const marketEncontrado = selectedMarkets.find((element) => element === marketLabel)

        if (marketEncontrado !== undefined) {
            const nuevoArray = selectedMarkets.filter((element) => element !== marketEncontrado);
            setSelectedMarkets(nuevoArray);
        }
        if (!marketEncontrado) {
            setSelectedMarkets([...selectedMarkets, marketLabel]);
        }
    }



    return (
        <>
            {
                sideBar === true && (<section className="fondoNegro"></section>)
            }

            <motion.section
                initial={{ opacity: 0, width: 200 }}
                animate={sideBar ? { opacity: 1, width: 400 } : {}}
                transition={{ duration: 0.3, delay: 0 }}
                className={sideBar ? "sideBar" : "noSideBar"}>

                <div className="contenedorConfiguracion">
                    <h2>Configuracion</h2>
                    <button className="settingsButton buttonCross" onClick={() => (toggleSidebar(), setDesplegar(false))}>
                        <Close className="settings cross" fontSize="inherit" />
                    </button>
                </div>

                <div className="itemsConfig">
                    <section className="acordion">
                        <button onClick={() => { toggleDesplegar("markets"), setEditar(false), setAgregar(false) }} className="topic">
                            <h3>Markets</h3>
                            <KeyboardArrowRight className={desplegar.markets && "rotate"} />
                        </button>
                        {
                            desplegar.markets && (
                                <>
                                    {
                                        valoresComisiones.map((element, index) => {
                                            const delay = 0.1 * index;
                                            const isSelected = selectedMarkets.includes(element.label)
                                            return (
                                                <div key={element.label} className={isSelected ? "botonEliminarComisionesRojo" : "botonEliminarComisiones"}>
                                                    {
                                                        editar && (
                                                            <motion.button
                                                                onClick={() => toggleEliminar(element.label)}
                                                                className="botonEliminar"><RemoveCircleOutline fontSize="inherit" /></motion.button>
                                                        )
                                                    }
                                                    <motion.div
                                                        initial={{ height: 0 }}
                                                        animate={{ height: "auto" }}
                                                        exit={{ height: 0, }}
                                                        transition={{ duration: 0.2 }}
                                                        className={isSelected ? "detalles detallesRojo" : "detalles"}>
                                                        <div className="comisiones">
                                                            <div className="mkpEdit">
                                                                <motion.h4
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    transition={{ duration: 0.3, delay: delay + 0.1 }}
                                                                >{element.label}</motion.h4>
                                                            </div>
                                                            {
                                                                editar === false ? (
                                                                    <motion.h4
                                                                        initial={{ opacity: 0 }}
                                                                        animate={{ opacity: 1 }}
                                                                        transition={{ duration: 0.3, delay: delay + 0.2 }}
                                                                    >%{element.value * 100}</motion.h4>
                                                                ) : (
                                                                    <input
                                                                        type="number"
                                                                        className={isSelected ? "inputComision comisionRojo" : "inputComision"}
                                                                        value={inputValues[index]}
                                                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                                                    />

                                                                )
                                                            }

                                                        </div>
                                                    </motion.div>

                                                </div>
                                            )
                                        })
                                    }

                                    <section
                                        className={agregar ? "seccionAgregar" : "seccionEditar"}>
                                        {
                                            agregar && (
                                                <>
                                                    <div className="inputsAgregar">
                                                        <input
                                                            onChange={(e) => setLabel(e.target.value)}
                                                            className="campoMkp" type="text" name="" id="" placeholder="MARKET..." />
                                                        <input
                                                            onChange={(e) => setValueMkp(e.target.value)}
                                                            className="campoComision" type="text" name="" id="" placeholder="%" />
                                                    </div>
                                                    {
                                                        isNaN(valueMkp) && (
                                                            <div className="valorNumerico">
                                                                <span>*Ingresa un valor numerico</span>
                                                            </div>
                                                        )
                                                    }
                                                    <div className="seccionEditar">
                                                        <button
                                                            className="botonCancelar"
                                                            onClick={() => setAgregar(false)}>CANCELAR</button>
                                                        <button
                                                            className="botonDone"
                                                            disabled={(isNaN(valueMkp) || valueMkp === 0 || label === "")}
                                                            onClick={() => (handleClickOpen())}><CheckCircleOutline className="check" fontSize="inherit" /></button>
                                                    </div>
                                                </>
                                            )
                                        }


                                        {
                                            editar && (
                                                <>
                                                    <button
                                                        className="botonCancelar"
                                                        onClick={() => (setEditar(!editar), cancelarChangeValue(), setSelectedMarkets([]))}>CANCELAR</button>
                                                    <button
                                                        className="botonDone"
                                                        onClick={() => (handleChangeValue())}><CheckCircleOutline className="check" fontSize="inherit" /></button>
                                                </>
                                            )
                                        }

                                        {
                                            editar || agregar === false && (
                                                <>
                                                    <motion.button
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.3, delay: 0.5 }}
                                                        onClick={() => setAgregar(true)}
                                                        className="agregar"> <Add className="add" fontSize="inherit" />AGREGAR</motion.button>
                                                    <motion.button
                                                        onClick={() => setEditar(!editar)}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.3, delay: 0.5 }}
                                                        className="editar"><Create className="edit" fontSize="inherit" /></motion.button>
                                                </>
                                            )
                                        }
                                    </section>

                                </>
                            )
                        }
                    </section>

                    <section
                        className="acordion">
                        <button onClick={() => toggleDesplegar("costoEnvio")} className="topic">
                            <h3>Costos de envio</h3>
                            <KeyboardArrowRight className={desplegar.costoEnvio && "rotate"} />
                        </button>
                        {
                            desplegar.costoEnvio && (
                                <>
                                    {
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: "auto" }}
                                            exit={{ height: 0, }}
                                            transition={{ duration: 0.2 }}
                                            className="detallesCostodeEnvio">
                                            {
                                                costosEnvio.length === 0 && (
                                                    <motion.h4
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.3, delay: 0.1 }}
                                                    >NO HAY DATOS</motion.h4>
                                                )
                                            }
                                        </motion.div>
                                    }
                                    <section
                                        className="seccionEditar">
                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3, delay: 0.3 }}
                                            className="agregar"> <Add className="add" fontSize="inherit" />AGREGAR</motion.button>
                                        <motion.button
                                            onClick={() => setEditar(!editar)}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3, delay: 0.3 }}
                                            className="editar"><Create className="edit" fontSize="inherit" /></motion.button>
                                    </section>
                                </>
                            )
                        }
                    </section>
                </div>
            </motion.section >
        </>
    )
}

export default Sidebar
