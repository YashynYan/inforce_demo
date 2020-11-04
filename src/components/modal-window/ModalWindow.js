import React from 'react'
import "../../styles/modal-window.scss"

function ModalWindow(props) {
    
    const { title } = props

    return (
        <div className="modal" id="modal">
            <div className="header">
                <div className="title">{title}</div>
            </div>
            {props.children}
        </div>
    )
}

export default ModalWindow
