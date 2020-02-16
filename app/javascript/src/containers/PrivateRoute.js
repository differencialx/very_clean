import {connect} from 'react-redux'
import PrivateRouteComponent from '../components/PrivateRoute'

function mapStateToProps(state) {
  return {
    session: state.session
  }
}

export default connect(mapStateToProps)(PrivateRouteComponent);
