import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { get, map } from 'lodash'
import { Link } from 'react-router-dom'

import Category from '../Category'
import { actions, selectors } from '../../redux/modules/form'

class CheckUp extends Component {
  componentWillMount () {
    const { isLoaded, loadForm } = this.props

    if (!isLoaded) {
      loadForm()
    }
  }

  render () {
    const { form, formId, isLoaded } = this.props

    const controls = map(
      form,
      (category, key) => (
        <Category key={key} category={category} formId={formId}/>
      )
    )

    return isLoaded
      ? (
        <div>
          <form>
            {controls}
          </form>
          <p>
            <Link to="/">Home</Link>
          </p>
        </div>
      )
      : <div>Loading</div>
  }
}

CheckUp.propTypes = {
  form: PropTypes.array,
  formId: PropTypes.string.isRequired,
  isLoaded: PropTypes.bool,
  loadForm: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  const formId = get(props, 'match.params.formId', '')

  return {
    form: selectors.getForm(state) || [],
    formId,
    isLoaded: selectors.isLoaded(state)
  }
}

const mapDispatchToProps = (dispatch, props) => {
  const formId = get(props, 'match.params.formId', '')

  return {
    loadForm () {
      dispatch(actions.fetchForm(formId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckUp)