import React, { Component } from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import { socketConnect } from 'socket.io-react';
import {sendMessage} from '../../AC';
import * as e from '../../constants';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {Paper} from 'material-ui';

import {styles} from './InputMessagePanelStyle'
/**
 * Компонент панели ввода сообщения в чат
 */
class InputMessagePanel extends Component {
  /**
   * Функция обработки сообщения по нажатию Enter
   */
  handleSubmit = (event) => {
    const {socket} = this.props;
    const body = event.target.value
    if (event.keyCode === 13 && body !== '') {
      const message = {
        body,
        from: 'You'
      }
      this.props.sendMessage(message)
      socket.emit(e.NEW_MESSAGE, body)
      event.target.value = '';
    }
  }
  componentDidMount(){
    this.props.socket.on(e.NEW_MESSAGE, message => {
      this.props.sendMessage(message)
    })
  }
  render() {
    const {classes} = this.props;
    return (
      <Paper className={classes.inputMessagePanel}>
        <textarea rows="7"
                  style={{width:'90%',padding:'20px'}}
                  placeholder="Message"
                  onKeyUp={this.handleSubmit}
        />
      </Paper>
    );
  }
}
InputMessagePanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

const materialWrapper = withStyles(styles);
const reduxWrapper = connect(state=>({
  messages:state.messages
}),{sendMessage})

export default compose(materialWrapper,reduxWrapper,socketConnect)(InputMessagePanel);
