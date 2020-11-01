import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import "../../styles/main-content.scss"
import { setFeedbacks } from '../../actions/feedbackActions'
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
 
toast.configure()

function MainContent(props) {
    const { setShowModal, setFeedbacks, feedbacks } = props

    const [ isLoading, setIsLoading ] = useState(true)
    const [ selectedId, setSelectedId ] = useState(null)

    useEffect(() => {
        fetch("http://localhost:8000/api/v1/feedback/", {
            method: 'GET'
        })
        .then(res=> res.json())
        .then(res=>{
            setFeedbacks(res.data)
        }
        ).then(
            setIsLoading(()=>{
                return false
            })
        )
    }, [])

    const onClickHandler = () => {
        setShowModal(prevState => {
            return true
        })
    }

    const onRemove = () => {
        fetch("http://localhost:8000/api/v1/feedback/" + selectedId, {
            method: 'DELETE'
        })
        .then(res=> res.json())
        .then(res=>{
            console.log(res)
            toast.success("Комментарий успешно удален!", {position: toast.POSITION.TOP_RIGHT})
            fetch("http://localhost:8000/api/v1/feedback/", {
            method: 'GET'
        })
        .then(res=> res.json())
        .then(res=>{
            setFeedbacks(res.data)
        }
        )
        }
        )
    }

    return (
        <div className="main_content">
            <div className="content_header">
                <div className="buttons_container">
                    <button className="btn primary" onClick={onClickHandler}>Добавить</button>
                    <button className="btn danger" onClick={onRemove}>Удалить</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Ф.И.О</th>
                        <th>Телефон</th>
                        <th>Email</th>
                        <th>Комментарий</th>
                    </tr>
                </thead>
                <tbody>
            {feedbacks.map(item => {
                return (
                    <tr className={selectedId===item.feedback_id?"selected":null} onClick={()=>{setSelectedId(item.feedback_id)}}>
                        <td>{item.feedback_id}</td>
                        <td>
                            <div>
                                <div>
                                    <strong>{item.feedback_midname}</strong>
                                </div>
                                <div>
                                    {item.feedback_firstname}{' '}{item.feedback_lastname}
                                </div>
                                <div>
                                    <em>{item.region_name}{", "}{item.city_name}</em>
                                </div>
                            </div>
                        </td>
                        <td>{item.feedback_phone}</td>
                        <td>{item.feedback_email}</td>
                        <td>{item.feedback_comment}</td>
                    </tr>
                )
            })}
            </tbody>
            </table>
            {feedbacks.length===0 && !isLoading?
                <p>Записей нет</p>:
                null
            }
        </div>
    )
}

const mapDispatchToProps = {
    setFeedbacks
}

const mapStateToProps =(store)=>{
    console.log(store)
    return {
        feedbacks: store.feedbacks
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(MainContent)
