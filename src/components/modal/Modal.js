import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { postFeedback, fetchFeedbacks, putFeedback } from '../../actions/feedbackActions'
import "../../styles/modal.scss"
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
import perfomValidation from '../validator/perfomValidation'
import Form from '../form/Form'
import ModalWindow from '../modal-window/ModalWindow'
import {useDispatch} from 'react-redux'
import { fetchRegions, fetchCities } from '../../actions/formActions'

toast.configure()

function Modal(props) {
    const dispatch = useDispatch()
    const {showModal, setShowModal, selectedFeedback, error, regions, cities} = props
    const defaultValue = selectedFeedback===null? {
        feedback_id: null,
        midname: "",
        firstname: "",
        lastname: "",
        region_id: "",
        city_id: "",
        phone: "",
        email: "",
        comment: "",
        formErrors: {}
    } : {feedback_id: selectedFeedback.feedback_id,
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
    const [options, setOptions] = useState({region_id: [], city_id:[]})

    useEffect(() => {
        dispatch(fetchRegions())      
    }, [])

    useEffect(() => {
        if(form.region_id!==""){
            dispatch(fetchCities(form.region_id)) 
            
        } else {
            setForm( prevState =>{
                return{
                    ...prevState,
                    city_id: ""
                }
            })
        }
    }, [form.region_id])

    useEffect(() => {
        setOptions(state => {
            return{
                ...state,
                region_id: regions
            }
        }) 
        
    }, [regions])

    useEffect(() => {
        setOptions(state => {
            return{
                ...state,
                city_id: cities
            }
        }) 
        
    }, [cities])
    
    const  sendFeedback = async () =>{
        console.log(form)
        const method = form.feedback_id===null?'POST': 'PUT';
        const bodyData = form.feedback_id===null?form:{   
            id: selectedFeedback.feedback_id,
            midname: selectedFeedback.feedback_midname,
            firstname: selectedFeedback.feedback_firstname,
            lastname: selectedFeedback.feedback_lastname,
            city_id: selectedFeedback.city_id,
            phone: selectedFeedback.feedback_phone,
            email: selectedFeedback.feedback_email,
            comment: selectedFeedback.feedback_comment
        }
        if (method==='POST') {
            await dispatch(postFeedback(bodyData)) 
            dispatch (fetchFeedbacks())
            setShowModal(prevState=>{
                return !prevState
            })
        } else {
            await dispatch(putFeedback(form.feedback_id, bodyData)) 
            dispatch (fetchFeedbacks())
            setShowModal(prevState=>{
                return !prevState
            }) 
        }
    }

    const onFormChange = (name, value) => {
        setForm (prevState => {
            return {
                ...prevState,
                [name]: value,
                formErrors: {}
            }
        })
    }

    const formValidation = () => {
        let validationObj= {}
        fieldsConfig.forEach(item => {
            const validationItem = perfomValidation(item, form[item.fieldName])
            if(!validationItem.valid){
                validationObj = {
                    ...validationObj,
                    [item.fieldName]: validationItem
                }   
            }
        })
        if(Object.keys(validationObj).length!==0){
            console.log(validationObj)
            toast.error("Форма с ошибками")
            setForm(prevState => {
                return {
                    ...prevState,
                    formErrors: validationObj
                }
            })
        } else {
            sendFeedback()
        }
    }
    console.log(options)
    if(showModal){
        return (
        <div>
            <ModalWindow title = {form.feedback_id===null?"Новый отзыв": "Изменить отзыв"}>
                <Form 
                    data = {form}
                    fieldsConfig = {fieldsConfig}
                    onFormChange = {onFormChange}
                    options = {options}
                />
                <div className="actions">
                    <button className="toggle-button" onClick={formValidation}>OK</button>
                    <button className="toggle-button cancel" onClick={() => {setShowModal(prevState=>{return !prevState})}}>Отмена</button>
                </div>
            </ModalWindow>
            
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
    required: true
}
]

const mapDispatchToProps = {
    
}

const mapStateToProps = state => (
    { 
        selectedFeedback: state.feedbackReducer.selectedFeedback,
        error: state.feedbackReducer.error,
        regions: state.formReducer.regions,
        cities: state.formReducer.cities,
    }
    )

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
