import React, {
  Component
} from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

export const UpdateAllocationForm = connect(
  (state, ownProps) => {
    var causes = _.values(_.omit(state.causes, 'count'))
    return {
      causes
    }
  }
)(class extends Component {
  render () {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className='field'>
          <label className='label'>Cause</label>
          <div className='control'>
            <select>
              {this.props.causes.map((cause) => {
                <option value={cause.index}>{cause.name}</option>
              })}
            </select>
          </div>
        </div>
        <div className='field'>
          <div className='control'>
            <input type='submit' value='Register' className='button is-success'/>
          </div>
        </div>
      </form>
    )
  }
})
