import React, { Component } from 'react';
import * as types from '../../constants/ActionTypes';
import nl2br from '../../utils/NewLine';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import * as styleCommon from '../../constants/Styles';

const customContentStyle = {
      width : '550px'
};

export default class DialogConfirm extends Component {
  constructor(props) {
    super(props);
    const { status } = this.props;
    this.state = {
      status: status
    };
  }

  handleConfirm(e, event, reSearch) {
    let params = {
      gamenId: this.props.gamenId
    };
    if (event != null) {
      this.props.executeData(event, params, reSearch);
    } else {
      this.props.executeData(types.DELETE, params, reSearch);
    }

  }

  componentWillReceiveProps(nextProps) {
    const {status} = nextProps;
    this.state = { status: status };
  }

  render() {
    const { message, title, status, typeAction } = this.props;

    const btnDialog = [
        <RaisedButton
          label="no"
          primary={true}
          onTouchTap={(e, type) => this.handleConfirm(e, status.confirmType, status.reSearch)}
          style={{marginRight: 20}}
        />
      , <RaisedButton
          label="yes"
          primary={true}
          onTouchTap={(e, type) => this.handleConfirm(e, types.CLOSE_DIALOG, status.reSearch)}
        />
    ];

    return (
      <div>
        <Dialog
          actions={btnDialog}
          modal={true}
          open={this.state.status.msgConfirmFlag}
          title={title}
          titleStyle={styleCommon.styles.titleStyle}
          contentStyle={customContentStyle}
          >
          {nl2br(message)}
        </Dialog>
      </div>
    );
  }
}
