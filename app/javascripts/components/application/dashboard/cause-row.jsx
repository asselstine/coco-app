import React, {
  Component
} from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import getCause from '../../../services/get-cause'

export const CauseRow = connect(
  (state, ownProps) => {
    return {
      cause: _.get(state, `causes[${ownProps.index}]`)
    }
  }
)(class extends Component {
  componentDidMount () {
    getCause(this.props.index)
  }
  render () {
    var name = _.get(this.props, 'cause.name') || ''
    return (
      <div>
        <p className='title'>{name.toString()}</p>
      </div>
    )
  }
})
