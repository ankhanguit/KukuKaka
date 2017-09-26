import React, {Component, PropTypes} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyRawTheme from '../myThemeFile';
import {AppBar, IconButton, IconMenu, MoreVertIcon, MenuItem} from 'material-ui';
import Header from '../components/Header';
import Login from '../components/Login';
import * as utils from '../utils/StringUtils';
import * as types from '../constants/ActionTypes';
import * as commonAction from '../actions/commonAction';
import * as LoginAction from '../actions/LoginAction';
import * as screen from '../constants/ScreenId';

const styles = {
  layout: {
    marginTop: '5.3em',
    marginLeft: '1.5em',
    marginRight: '1.5em',
    marginBottom: '1.5em'
  }
};

class Menu extends Component {
  constructor(props) {
    super(props);
    this.executeData = this.executeData.bind(this);
  }

  static get childContextTypes() {
    return {muiTheme: PropTypes.object.isRequired};
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(MyRawTheme)};
  }

  executeData(event, params={}) {
    this.props.dispatch(commonAction.CommonAction(screen.LOGIN, event, params));
  }

  render() {
      const { actions, userInfo, status, message } = this.props.LoginState;
      const { children } = this.props;
      let isLogin = !utils.isEmpty(userInfo['asdf']);

      return (
        <div>
          {utils.isEmpty(children) || !isLogin
            ? (isLogin
              ? <div>
                  <Header headerTitle="ホーム" user={userInfo.asdf} executeData={this.executeData}/>
                  <h1 style={styles.layout}>Login sucess!</h1>
                </div>
              : <div>
                  <AppBar
                    title='ログイン'
                    showMenuIconButton={true}
                  />
                  <Login actions={actions} status={status} message={message} executeData={this.executeData}/>
                </div>)
            : <div>
              <Header headerTitle={children.props.route.headerTitle} user={userInfo.asdf} executeData={this.executeData}/>
              <div style={styles.layout}>
                {children}
              </div>
            </div>
          }
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return state.LoginReducer;
};

const mapDispatchToProps = (dispatch) => {
  return {
      dispatch: dispatch
    , actions: bindActionCreators(Object.assign({}, LoginAction, commonAction), dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
