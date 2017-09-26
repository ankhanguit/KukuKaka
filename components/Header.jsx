import React, {PropTypes, Component} from 'react';
import {AppBar, IconButton, IconMenu, MoreVertIcon, MenuItem} from 'material-ui';
import FaceIcon from 'material-ui/svg-icons/action/face';
import ActionHome from 'material-ui/svg-icons/action/home';
import FlipToBack from 'material-ui/svg-icons/action/flip-to-back';
import Drawer from 'material-ui/Drawer';
import {Link, browserHistory, withRouter} from 'react-router';

import MyRawTheme from '../myThemeFile';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import * as utils from '../utils/StringUtils';
import {Menu} from '../constants/Menu';
import LoginInfo from './LoginInfo';

const styleLink = {
  textDecoration: 'none'
};

let valueSelected=0;
let SelectableList = makeSelectable(List);

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedIndex: 0
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleRequestChange = this.handleRequestChange.bind(this);
  }

  static get childContextTypes() {
    return {muiTheme: PropTypes.object.isRequired};
  }

  static get contextTypes() {
    return {router: PropTypes.object};
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(MyRawTheme)};
  }

  handleToggle() {
    this.setState({
      open: !this.state.open
    });
  }

  handleRequestChange(event, index) {
    this.setState({
      selectedIndex: index
    });
  };

  handleClose(value) {
    this.setState({open: false});
  };

  render() {
    let masterScreens = utils.isEmpty(Menu.master) ? '' : Menu.master.map( (value, key) => (
        <ListItem
          key={key}
          value={key+10}
          onTouchTap={this.handleClose.bind(this)}
          containerElement={<Link to={value.id} style={styleLink}/>}>
            {value.id + " " + value.name}
        </ListItem >
    ));

    let settingScreens = utils.isEmpty(Menu.setting) ? '' : Menu.setting.map( (value, key) => (
        <ListItem
          key={key}
          value={key+400}
          onTouchTap={this.handleClose.bind(this)}
          containerElement={<Link to={value.id} style={styleLink}/>}>
            {value.id + " " + value.name}
        </ListItem >
    ));

    return (
      <div>
        <header className="header">
          <AppBar
            title={this.props.headerTitle}
            onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
            iconElementRight={
              <LoginInfo user={this.props.user} executeData={this.props.executeData}/>
            }
            showMenuIconButton={true}
            style={{position: 'fixed', top: 0, zIndex: 1101}}
          />
          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
            >
              <AppBar title='Menu'/>
              <SelectableList value={this.state.selectedIndex} onChange={(event, index) => this.handleRequestChange(event, index)}>
                <ListItem
                  value={0}
                  onTouchTap={this.handleClose.bind(this)}
                  containerElement={<Link to={"/"} style={styleLink}/>}>
                </ListItem >
                <ListItem
                  value={1}
                  primaryText="fasdfsda"
                  nestedItems={masterScreens}
                  initiallyOpen={false}
                  primaryTogglesNestedList={true}
                />
                
              </SelectableList >
          </Drawer>
        </header>
      </div>
    );
  }
}
export default withRouter(Header);
