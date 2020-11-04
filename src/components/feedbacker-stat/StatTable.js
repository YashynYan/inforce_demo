import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {connect, useDispatch} from 'react-redux'
import {  fetchFeedbacks } from '../../actions/feedbackActions'
import { fetchRegions } from '../../actions/formActions'

function StatTable(props) {

    const currentLocation = useLocation().pathname;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchFeedbacks())
        dispatch(fetchRegions())
    }, [])

    
    const {regions, feedbacks} = props

    const createTableArray = () => {
        const tableArray = regions.reduce( (acc, regionItem) => { 
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
                            <Link to={currentLocation + "/region/"+item.region_id} target="_blank">{item.region_name}</Link>
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

const mapStateToProps = state => (
    { 
        regions: state.formReducer.regions,
        feedbacks: state.feedbackReducer.feedbacks
    }
    )

export default connect(mapStateToProps)(StatTable)
