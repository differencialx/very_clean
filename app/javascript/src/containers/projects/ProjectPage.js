import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as projectActions from '../../actions/actions'
import ProjectPageComponent from '../../components/projects/ProjectPage'
import { values } from 'lodash'

class ProjectsPage extends React.Component {
  componentWillMount() {
    this.props.fetchProjectsRequest()
  }

  render() {
    return (
      <ProjectPageComponent projects={Object.values(this.props.projects)} loading={this.props.loading} />
    )
  }
}

function mapStateToProps(state) {
  return {
    projects: values(state.entities.projects),
    loading: state.loading.projectLoading
  }
}

const mapDispatchToProps = {
  fetchProjectsRequest: projectActions.fetchProjectsRequest,
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage)
