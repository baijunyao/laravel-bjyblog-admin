import React from 'react';
import Redirect from 'umi/redirect';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import Authorized from '@/utils/Authorized';
import { ConnectProps, ConnectState, Route, UserModelState } from '@/models/connect';

interface AuthComponentProps extends ConnectProps {
  user: UserModelState;
}

const getRouteAuthority = (path: string, routeData: Route[]) => {
  let authorities: string[] | string | undefined;
  routeData.forEach(route => {
    // match prefix
    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      }
      // get children authority recursively
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

const AuthComponent: React.FC<AuthComponentProps> = ({
  children,
  route = {
    routes: [],
  },
  location = {
    pathname: '',
  },
  user,
}) => {
  const { currentUser } = user;
  const { routes = [] } = route;

  return currentUser.name !== undefined ? (
    <Authorized
      authority={getRouteAuthority(location.pathname, routes) || ''}
      noMatch={<Redirect to="/user/login" />}
    >
      {children}
    </Authorized>
  ) : <Redirect to="/user/login" />;
};

export default connect(({ user }: ConnectState) => ({
  user,
}))(AuthComponent);
