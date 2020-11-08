import React, { useState } from 'react'
import "../../styles/styles.scss"
import Navbar from './Navbar'
import MainContent from './MainContent'
import Modal from '../modal/Modal'

function Feedbacker() {

    const [showModal, setShowModal] = useState (false)

    return (
        <div>
        <div className={"menu-container" + (showModal?"-faded": "")}>
            <Navbar/>
            <MainContent setShowModal={setShowModal}/> 
        </div>
        {showModal?<Modal showModal={showModal} setShowModal={setShowModal} />: null}
        </div>
    )
}

export default Feedbacker
