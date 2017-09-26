import React from 'react';
import {Link, browserHistory} from 'react-router';
import Header from '../components/Header';
import * as utils from '../utils/StringUtils';

const styles = {
  layout: {
    marginTop: '4.3em',
    marginLeft: '1.5em',
    marginRight: '1.5em',
    marginBottom: '1.5em'
  }
};

export default function Menu({children}) {
  return (
    <div>
      {utils.isEmpty(children)
        ? <div>
            <Header headerTitle="asdfsad"/>
            <h1 style={styles.layout}>Hello World</h1>
          </div>
        : <div>
          <Header headerTitle={children.props.route.headerTitle}/>
          <div style={styles.layout}>
            {children}
          </div>
        </div>
      }
    </div>
  );
}
