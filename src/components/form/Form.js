import React from 'react'
import "../../styles/form.scss"

function Form(props) {

    const { data, fieldsConfig, onFormChange, options } = props

    const renderForm = (fieldConfig) => {
        const error = !(data.formErrors[fieldConfig.fieldName]===undefined)
        const input = fieldConfig.fieldType === "textarea" ?
        <textarea name={fieldConfig.fieldName} value={data[fieldConfig.fieldName]} onChange={e=>{onFormChange(e.target.name, e.target.value)}}></textarea>:
        fieldConfig.fieldType==="dropdown" ?
        <select name={fieldConfig.fieldName} value={data[fieldConfig.fieldName]} onChange={e=>{onFormChange(e.target.name, e.target.value)}}>
            <option value="" disabled selected>Select your option</option>
            {options[fieldConfig.fieldName].map(item => {
                return(
                    <option value={item.id}>{item.name}</option>
                )
            })}
        </select>:
        <input type={fieldConfig.fieldType} name={fieldConfig.fieldName} value={data[fieldConfig.fieldName]} onChange={e=>{onFormChange(e.target.name, e.target.value)}}></input>


        return(
            <div className={"form" + (error?" error":"")}>
                <label>{fieldConfig.fieldLabel}{fieldConfig.required?<span className="required_tag">*</span>:null}</label>
                {input}
                {error? <span className="error_tag">{data.formErrors[fieldConfig.fieldName].message}</span>: null}
            </div>
        )
    }

    return (
        <div className="form">
                {fieldsConfig.map(item => {
                    return (
                        renderForm(item)
                    )
                })}
        </div>
    )
}

export default Form
