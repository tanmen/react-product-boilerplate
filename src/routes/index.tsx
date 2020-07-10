import React, {FC} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {RootPage} from '../components/RootPage';
import {RouteProps} from 'react-router';

export const Paths: { [key: string]: (...args: any[]) => RouteProps } = {
  Root: () => ({
    path: '/',
    component: RootPage
  })
}


export const Routes: FC = () =>
  <BrowserRouter>
    <Switch>
      <Route {...Paths.Root()}/>
    </Switch>
  </BrowserRouter>
