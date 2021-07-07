import React from 'react';
// import {loadFunctionFromAction } from '../store/actions/'
import { connect } from 'react-redux';
export class HomePage extends React.Component {
  state = {
    tasks: {},
    column: {}
  }


  render() {

    return (
      <div>
        <h1>home</h1>
      </div>
    )
  }
}




const mapStateToProps = (state) => {
  return {
    users: state.user.users
  }
}


const mapDispatchToProps = {
  // loadFunctionFromAction
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)