import React, { useEffect }  from 'react'
import {connect, useDispatch} from 'react-redux'
import { fetchRegions } from '../../redux/actions/formActions'
import { feedbacksByRegionId } from '../../redux/actions/StateTablesActions'

function RegionStatTable(props) {
    console.log(props)
    const {match, citiesTableArray, regions} = props
    const regionId = match.params.id
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(feedbacksByRegionId(regionId))
        dispatch(fetchRegions())
    }, [])

    const region = regions.find(region => region.id===parseInt(regionId))
    
    return (
        <div>
            <h2>Распределение по городам региона {region? `"${region.name}"`:null }</h2>
            <table>
                <thead>
                    <tr>
                        <th>№ Города</th>
                        <th>Наименование</th>
                        <th>Количество комментариев</th>
                    </tr>
                </thead>
                <tbody>
            {citiesTableArray.map(item => {
                return (
                    <tr>
                        <td>{item.city_id}</td>
                        <td>
                            {item.city_name}
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
        citiesTableArray: state.tableReducer.tableOfCities,
        regions: state.formReducer.regions
    }
    }

export default connect(mapStateToProps)(RegionStatTable)
