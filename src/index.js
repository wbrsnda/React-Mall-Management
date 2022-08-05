import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {mainRoutes} from './Routes'
import {Provider} from 'react-redux';
import store from './store';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Provider store={store}>
  <Router>
    <Switch>
      <Route path="/admin" render={routeProps=><App {...routeProps}/>}/>
      {mainRoutes.map(route=>{
        return <Route key={route.path} {...route}/> 
      })}
      <Redirect to="/admin" from='/'/>
      <Redirect to="/404"/>
    </Switch>
  </Router>
</Provider>);

// ReactDOM.render(
//   <Provider store={store}>
//     <Router>
//       <Switch>
//         <Route path="/admin" render={routeProps=><App {...routeProps}/>}/>
//         {mainRoutes.map(route=>{
//           return <Route key={route.path} {...route}/> 
//         })}
//         <Redirect to="/admin" from='/'/>
//         <Redirect to="/404"/>
//       </Switch>
//     </Router>
//   </Provider>,
//   document.getElementById('root')
// );

reportWebVitals();
