import {Component} from 'react';
import './App.css';
import {Switch,Route,Redirect} from 'react-router-dom'
import { adminRoutes } from './Routes';
import Frame from './components/Frame/index';
import { isLogined } from './utils/auth';

export default class App extends Component{
  render(){
    return( isLogined()?(
      <Frame>
        <Switch>
          {adminRoutes.map(route=>{
            return(
              <Route 
                key={route.path} 
                path={route.path} 
                exact={route.exact} 
                render={routeprops=>{
                return <route.component  {...routeprops} />;
              }}
              />
            );
          })}
          <Redirect to={adminRoutes[0].path} from='/admin'/>
          <Redirect to="/404"/>
        </Switch>
      </Frame>
      ):(<Redirect to='/login'/>))
  }
}
