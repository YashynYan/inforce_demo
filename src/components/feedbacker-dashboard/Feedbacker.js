import React, { useState } from 'react'
import "../../styles/styles.scss"
import Navbar from './Navbar'
import MainContent from './MainContent'
import Modal from '../modal/Modal'

function Feedbacker() {

    const [showModal, setShowModal] = useState (false)
    console.log(showModal)

    return (
        <div>
        <div className={"menu-container" + (showModal?"-faded": "")}>
            <Navbar/>
            <MainContent setShowModal={setShowModal}/> 
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal} />
        </div>
    )
}

export default Feedbacker
