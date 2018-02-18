import React, {
  Component
} from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import getAllocation from '../../../services/get-allocation'

export const AllocationRow = connect(
  (state, ownProps) => {
    var allocation = _.get(state, `allocations[${ownProps.index}]`)
    if (allocation) {
      cause: _.get(state, `causes[${allocation.causeIndex}]`)
    }
    return {
      allocation,
      cause
    }
  }
) (class extends Component {
  componentDidMount () {
    getAllocation(this.props.index)
  }

  render () {
    return (
      <tr>
        <td>
          {_.get(this.props, 'cause.name')}
        </td>
        <td>
          {_.get(this.props, 'allocation.percentage', '').toString()}
        </td>
      </tr>
    )
  }
})
