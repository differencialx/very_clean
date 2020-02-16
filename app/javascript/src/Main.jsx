import React from 'react'
import Header from './containers/Header'

import './scss/application.scss'

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Header history={this.props.history} />
        <div className="page-container">
          <div className="container">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Main
