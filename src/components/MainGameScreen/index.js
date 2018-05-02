import React, { Component } from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import { socketConnect } from 'socket.io-react';
import {OutputResulForm} from '../'
//import {} from '../../AC';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
//import {} from 'material-ui';

import {styles} from './MainGameScreenStyle'

class MainGameScreen extends Component {
  render() {
    const {classes,gestures,socket} = this.props;
    const order = gestures.length > 1 && gestures[0].from === socket.id ? true : false;
    const body = (
      <div className={classes.block}>
        <div className={classes.pair}>
          {gestures.length<2?"Rock":order ? gestures[0].gesture:gestures[1].gesture}
        </div>
        <div className={classes.pair}>
          {gestures.length<2?"Rock":order ? gestures[1].gesture:gestures[0].gesture}
        </div>
      </div>
    );
    return (
      <div className={classes.main}>
        {body}
        <OutputResulForm />
      </div>
    );
  }
}
MainGameScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

const materialWrapper = withStyles(styles);
const reduxWrapper = connect(state=>({
  gestures:state.gestures
}),{})

export default compose(materialWrapper,reduxWrapper,socketConnect)(MainGameScreen);
