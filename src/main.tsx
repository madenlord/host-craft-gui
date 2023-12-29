import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Index, {
  loader as configLoader
} from './pages/index';
import Settings from './pages/settings';
import ConfigureServer, {
  loader as serverLoader,
  action as serverAction
} from './pages/server';
import ConfigureRepo, {
  loader as repoLoader,
  action as repoAction
} from './pages/repo';

import './style/globals.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route
      path='/'
      element={<Index />}
      loader={configLoader}
    />
    <Route
      path='/settings'
      element={<Settings />}
    />
    <Route
      path="/settings/server"
      element={<ConfigureServer />}
      loader={serverLoader}
      action={serverAction}
    />
    <Route
      path="/settings/repo"
      element={<ConfigureRepo />}
      loader={repoLoader}
      action={repoAction}
    />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
