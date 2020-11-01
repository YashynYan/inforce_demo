import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addFeedbacks } from '../../actions/feedbackActions'
import "../../styles/modal.scss"
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'

toast.configure()

function Modal(props) {

    const {showModal, setShowModal, addFeedbacks} = props

    const [form, setForm] = useState({
        midname: "",
        firstname: "",
        lastname: "",
        region_id: "",
        city_id: "",
        phone: "",
        email: "",
        comment: ""
    })

    const [options, setOptions] = useState({region_id:[], city_id:[]})

    useEffect(() => {
        fetch("http://localhost:8000/api/v1/region/")
        .then(res=> res.json())
        .then(res=>{
            setOptions(prevState =>{
                return{
                ...prevState,
                region_id: res.data
            }
            })
        }
        )
    }, [])

    useEffect(() => {
        if(form.region_id!==""){
        fetch(`http://localhost:8000/api/v1/city/region/${form.region_id}`)
            .then(res=> res.json())
            .then(res=>{
                setOptions(prevState =>{
                    return{
                    ...prevState,
                    city_id: res.data
                }
                })
            }
            )
        
        } else {
            setForm( prevState =>{
                return{
                    ...prevState,
                    city_id: ""
                }
            })
        }
    }, [form.region_id])

    const postFeedback = () =>{
        fetch("http://localhost:8000/api/v1/feedback/", {
            method: 'POST',
            body: JSON.stringify(form),
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            } 
        })
        .then(res=> res.json())
        .then(res=>{
            if(res.error){
                toast.error("Форма с ошибками", {position: toast.POSITION.TOP_RIGHT})
            } else {
            toast.success("Комментарий успешно создан!", {position: toast.POSITION.TOP_RIGHT})
            const newFeedback = {
                feedback_id: res.id,
                city_name: options.city_id.find(obj => obj.id.toString() === res.data.city_id).name,
                city_id: res.data.city_id,
                feedback_comment: res.data.comment,
                feedback_email: res.data.email,
                feedback_firstname: res.data.firstname,
                feedback_lastname: res.data.lastname,
                feedback_midname: res.data.midname,
                feedback_phone: res.data.phone,
                region_id: res.data.region_id,
                region_name: options.region_id.find(obj => obj.id.toString() === form.region_id).name,
            };
            console.log(newFeedback)
            addFeedbacks(newFeedback)
            setShowModal(prevState=>{
                return !prevState
            })
        }
        }
        )
    }

    const onFormChange = (name, value) => {
        setForm (prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const renderForm = (fieldConfig) => {
        
        const input = fieldConfig.fieldType === "textarea" ?
        <textarea name={fieldConfig.fieldName} value={form[fieldConfig.fieldName]} onChange={e=>{onFormChange(e.target.name, e.target.value)}}></textarea>:
        fieldConfig.fieldType==="dropdown" ?
        <select name={fieldConfig.fieldName} value={form[fieldConfig.fieldName]} onChange={e=>{onFormChange(e.target.name, e.target.value)}}>
            <option value="" disabled selected>Select your option</option>
            {options[fieldConfig.fieldName].map(item => {
                return(
                    <option value={item.id}>{item.name}</option>
                )
            })}
        </select>:
        <input type={fieldConfig.fieldType} name={fieldConfig.fieldName} value={form[fieldConfig.fieldName]} onChange={e=>{onFormChange(e.target.name, e.target.value)}}></input>


        return(
            <div className="form">
                <label>{fieldConfig.fieldLabel}</label>
                {input}
            </div>
        )
    }

    if(showModal){
        return (
        <div className="modal" id="modal">
            <div className="header">
                <div className="title">Новый отзыв</div>
                
            </div>
            <div className="form">
                {fieldsConfig.map(item => {
                    return (
                        renderForm(item)
                    )
                })}
            </div> 
            <div className="actions">
              <button className="toggle-button" onClick={postFeedback}>OK</button>
            </div>
        </div> 
        )
    } else {
        return null
    }
}

const fieldsConfig = [{
    value: "",
    fieldLabel: "Фамилия",
    fieldType: "text",
    fieldName: "midname"
},
{
    value: "",
    fieldLabel: "Имя",
    fieldType: "text",
    fieldName: "firstname"
},
{
    value: "",
    fieldLabel: "Отчество",
    fieldType: "text",
    fieldName: "lastname"
},
{
    value: "",
    fieldLabel: "Регион",
    fieldType: "dropdown",
    fieldName: "region_id"
},
{
    value: "",
    fieldLabel: "Город",
    fieldType: "dropdown",
    fieldName: "city_id"
},
{
    value: "",
    fieldLabel: "Контактный телефон",
    fieldType: "text",
    fieldName: "phone"
},
{
    value: "",
    fieldLabel: "Email",
    fieldType: "text",
    fieldName: "email"
},
{
    value: "",
    fieldLabel: "Комментарий",
    fieldType: "textarea",
    fieldName: "comment"
}
]

const mapDispatchToProps = {
    addFeedbacks
}

export default connect(null, mapDispatchToProps)(Modal)
