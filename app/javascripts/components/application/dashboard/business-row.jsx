import React, {
  Component
} from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import getBusiness from '../../../services/get-business'

export const BusinessRow = connect(
  (state, ownProps) => {
    return {
      business: _.get(state, `businesses[${ownProps.index}]`)
    }
  }
)(class extends Component {
  componentDidMount () {
    getBusiness(this.props.index)
  }
  render () {
    var name = _.get(this.props, 'business.name') || ''
    var percentage = _.get(this.props, 'business.percentage') || 0
    return (
      <div>
        <p className='title'>{name.toString()}</p>
        <p className='title'>{new String(percentage)}%</p>
      </div>
    )
  }
})
