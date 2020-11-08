import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {connect, useDispatch} from 'react-redux'
import {feedbacksByRegions} from '../../redux/actions/StateTablesActions'

function StatTable(props) {

    const currentLocation = useLocation().pathname;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(feedbacksByRegions())
    }, [])

    
    const {regionsTableArray} = props

    return (
        <div>
            <h2>Распределение по регионам</h2>
            <table>
                <thead>
                    <tr>
                        <th>№ Региона</th>
                        <th>Наименование</th>
                        <th>Количество комментариев</th>
                    </tr>
                </thead>
                <tbody>
            {regionsTableArray.map(item => {
                return (
                    <tr>
                        <td>{item.region_id}</td>
                        <td>
                            <Link to={currentLocation + '/region/' +item.region_id} target="_blank">{item.region_name}</Link>
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

const mapStateToProps = state => {
    console.log(state)
    return { 
        regionsTableArray: state.tableReducer.tableOfRegions
    }
    }

export default connect(mapStateToProps)(StatTable)
