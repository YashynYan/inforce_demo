import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function StatTable() {

    const [regions, setRegions] = useState ([])
    const [feedbacks, setFeedbacks] = useState([])
    const currentLocation = useLocation().pathname;

    useEffect(() => {
        fetch("http://localhost:8000/api/v1/feedback/", {
            method: 'GET'
        })
        .then(res=> res.json())
        .then(res=>{
            console.log(res)
            setFeedbacks(()=>
            {
                return res.data
            })
        }
        )

        fetch("http://localhost:8000/api/v1/region/")
        .then(res=> res.json())
        .then(res=>{
            console.log(res)
            setRegions(() =>{
                return res.data
            })
        }
        )
    }, [])

    const createTableArray = () => {
        const tableArray = regions.reduce( (acc, regionItem, index, array) => { 
            console.log(acc)
            const feedbacksCount = feedbacks.filter(item => item.region_id===regionItem.id).length
            if(feedbacksCount!==0){
                return acc.concat({region_id: regionItem.id, region_name: regionItem.name, feedbacks_count: feedbacksCount})
            } else { return acc }
        }, [])

        return tableArray
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>№ Региона</th>
                        <th>Наименование</th>
                        <th>Количество комментариев</th>
                    </tr>
                </thead>
                <tbody>
            {createTableArray().map(item => {
                return (
                    <tr>
                        <td>{item.region_id}</td>
                        <td>
                            <Link to={currentLocation + "/region"/*+item.region_id*/} target="_blank">{item.region_name}</Link>
                        </td>
                        <td>{item.feedbacks_count}</td>
                    </tr>
                )
            })}
            </tbody>
            </table>
        </div>
    )
}

export default StatTable
