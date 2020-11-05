import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import "../../styles/main-content.scss"
import { deleteFeedback, fetchFeedbacks, setFeedbacks, setSelectedFeedback } from '../../actions/feedbackActions'
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
import {useDispatch} from 'react-redux'
 
toast.configure()

function MainContent(props) {
    const { setShowModal, feedbacks, setSelectedFeedback } = props
    const dispatch = useDispatch()
    const [ isLoading, setIsLoading ] = useState(true)
    const [ selectedId, setSelectedId ] = useState(null)

    useEffect(() => {
        dispatch(fetchFeedbacks())
    }, [])

    const onClickHandler = (action) => {
        console.log(action)
        switch(action){
            case "add": 
            setShowModal(prevState => {
                return true
            })
            break;
            case "remove":
                onRemove()
                setSelectedId(null)
                break;
            case "change":
                if(selectedId===null){
                    toast.warn("Выберете комментарий", {position: toast.POSITION.TOP_RIGHT})
                } else {
                    setSelectedFeedback(selectedId)
                    setShowModal(prevState => {
                        return true
                    })
                }
                break;
        }
    }

    const onRemove = () => {
        dispatch(deleteFeedback(selectedId))
    }
    
    return (
        <div className="main_content">
            <div className="content_header">
                <div className="buttons_container">
                    <button className="btn primary" name="add" onClick={(e)=>{onClickHandler(e.target.name)}}>Добавить</button>
                    <button className="btn danger" name="remove" onClick={(e)=>{onClickHandler(e.target.name)}}>Удалить</button>
                    <button className="btn secondary" name="change" onClick={(e)=>{onClickHandler(e.target.name)}}>Изменить</button>
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
                    <tr className={selectedId===item.feedback_id?"selected":null} onClick={()=>{selectedId===item.feedback_id? setSelectedId(null): setSelectedId(item.feedback_id)}}>
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
    setFeedbacks,
    setSelectedFeedback
}

const mapStateToProps =(store)=>{
    console.log(store)
    return {
        feedbacks: store.feedbackReducer.feedbacks
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(MainContent)
