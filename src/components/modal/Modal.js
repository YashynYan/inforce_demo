import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addFeedbacks, setSelectedFeedback } from '../../actions/feedbackActions'
import "../../styles/modal.scss"
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
import perfomValidation from '../validator/perfomValidation'

toast.configure()

function Modal(props) {

    const {showModal, setShowModal, addFeedbacks, setSelectedFeedback, selectedFeedback} = props
    const defaultValue = selectedFeedback===null? {
        id: null,
        midname: "",
        firstname: "",
        lastname: "",
        region_id: "",
        city_id: "",
        phone: "",
        email: "",
        comment: "",
        formErrors: {}
    } : {id: selectedFeedback.feedback_id,
        midname: selectedFeedback.feedback_midname,
        firstname: selectedFeedback.feedback_firstname,
        lastname: selectedFeedback.feedback_lastname,
        region_id: selectedFeedback.region_id,
        city_id: selectedFeedback.city_id,
        phone: selectedFeedback.feedback_phone,
        email: selectedFeedback.feedback_email,
        comment: selectedFeedback.feedback_comment,
        formErrors: {}
    }

    const [form, setForm] = useState(defaultValue)
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

        const url = "http://localhost:8000/api/v1/feedback/" + (form.feedback_id===null?"":form.id);
        const method = form.feedback_id===null?'POST': 'PUT';
        const bodyData = form.feedback_id===null?form:
        {   id: selectedFeedback.feedback_id,
            midname: selectedFeedback.feedback_midname,
            firstname: selectedFeedback.feedback_firstname,
            lastname: selectedFeedback.feedback_lastname,
            city_id: selectedFeedback.city_id,
            phone: selectedFeedback.feedback_phone,
            email: selectedFeedback.feedback_email,
            comment: selectedFeedback.feedback_comment
        }

        fetch(url, {
            method: method,
            body: JSON.stringify(bodyData),
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
            if(method==='POST'){
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
            }
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
                [name]: value,
                // formErrors: {}
            }
        })
    }

    const formValidation = () => {
        let validationObj= {}
        fieldsConfig.forEach(item => {
            const validationItem = perfomValidation(item, form[item.fieldName])
            console.log(validationItem)
            if(!validationItem.valid){
                validationObj = {
                    ...validationObj,
                    [item.fieldName]: validationItem
                }   
            }
        })
        if(Object.keys(validationObj).length!==0){
            console.log(validationObj)
            setForm(prevState => {
                return {
                    ...prevState,
                    formErrors: validationObj
                }
            })
        } else {
            postFeedback()
        }
    }

    const renderForm = (fieldConfig) => {
        const error = false
        // !(form.formErrors[fieldConfig.fieldName]===undefined)
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
            <div className={"form" + (error?" error":"")}>
                <label>{fieldConfig.fieldLabel}</label>
                {input}
                {error? <span className="error_tag">{form.formErrors[fieldConfig.fieldName].message}</span>: null}
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
              <button className="toggle-button" onClick={formValidation}>OK</button>
              <button className="toggle-button cancel" onClick={() => {setShowModal(prevState=>{return !prevState})}}>Отмена</button>
            </div>
        </div> 
        )
    } else {
        return null
    }
}

const fieldsConfig = [{
    fieldLabel: "Фамилия",
    fieldType: "text",
    fieldName: "midname",
    type: "text",
    required: true
},
{
    fieldLabel: "Имя",
    fieldType: "text",
    fieldName: "firstname",
    type: "text",
    required: true
},
{
    fieldLabel: "Отчество",
    fieldType: "text",
    fieldName: "lastname",
    type: "text",
    required: true
},
{
    fieldLabel: "Регион",
    fieldType: "dropdown",
    fieldName: "region_id",
    type: "text",
    required: true
},
{
    fieldLabel: "Город",
    fieldType: "dropdown",
    fieldName: "city_id",
    type: "text",
    required: true
},
{
    fieldLabel: "Контактный телефон",
    fieldType: "text",
    fieldName: "phone",
    type: "phone",
    required: true
},
{
    fieldLabel: "Email",
    fieldType: "text",
    fieldName: "email",
    type: "email",
    required: true
},
{
    fieldLabel: "Комментарий",
    fieldType: "textarea",
    fieldName: "comment",
    type: "text",
    required: false
}
]

const mapDispatchToProps = {
    addFeedbacks,
    setSelectedFeedback
}

const mapStateToProps = state => (
    { selectedFeedback: state.selectedFeedback }
    )

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
