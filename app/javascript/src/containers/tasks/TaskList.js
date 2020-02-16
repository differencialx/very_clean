import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Col,} from 'react-bootstrap'
import TaskItemCreateForm from './TaskItemCreateForm'
import TaskItem from './TaskItem'
import orderBy from 'lodash/orderBy'

class TaskList extends React.Component {
  renderTask = (task) => {
    return(
      <TaskItem task={task} key={task.id} projectId={this.props.projectId} />
    )
  }

  render() {
    const { props: { projectId } } = this

    return (
      <div>
        { orderBy(this.props.tasks, ['position'],['asc']).map(this.renderTask) }
        <TaskItemCreateForm projectId={projectId} />
      </div>
    )
  }
}

export default TaskList
