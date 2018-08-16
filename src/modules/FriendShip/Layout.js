import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Helmet from 'react-helmet';
import isGoToLogin from '../../components/isGoToLogin/isGoToLogin';
import Page404 from '../../assembly/404/index';
import Index from './Index/index';

@hot(module)
@withRouter
class ModuleLayout extends Component{
  static propTypes: Object = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  componentDidMount(): void{
    isGoToLogin.call(this);
  }
  render(): React.childrenArray<React.Element>{
    return [
      <Helmet key="helmet">
        <title>用户关注</title>
      </Helmet>,
      <Switch key="route">
        <Route path="/FriendShip" component={ Index } exact={ true } />
        <Route component={ Page404 } />
      </Switch>
    ];
  }
}

export default ModuleLayout;