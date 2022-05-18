import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from './components/Landing.jsx';
import Home from './components/Home.jsx';
import CardDetails from './components/CardDetails.jsx';
import Form from './components/Create';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = '/'> <Landing/></Route>
        <Route path= '/home/'  > <Home /></Route>
        <Route path= '/countries/:id' > <CardDetails /></Route>
        <Route path='/activity'> <Form/></Route>
        </Switch>
        </BrowserRouter>


  );
}

export default App;
