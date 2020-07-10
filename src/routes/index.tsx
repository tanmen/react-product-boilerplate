import {RootPage} from 'containers/pages';
import {ListPage} from 'containers/pages/ListPage';
import React, {FC} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

export {useHistory, useLocation, useParams, useRouteMatch} from 'react-router-dom';

export const Routes: FC = () =>
  <BrowserRouter>
    <Switch>
      <Route path={Paths.List.template} component={ListPage}/>
      <Route strict path={Paths.Root.template} component={RootPage}/>
    </Switch>
  </BrowserRouter>;

export const Paths: IPaths = {
  Root: {
    path: () => '/',
    template: '/'
  },
  List: {
    path: () => '/todos',
    template: '/todos'
  }
}

export type Path = {
  path: (...args: Array<string | number>) => string;
  template: string;
}

type IPaths = {
  Root: Path,
  List: Path
}

