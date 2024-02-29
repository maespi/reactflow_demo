import {Link} from 'react-router-dom'
import logo from './assets/images/logo.svg';
import logo2 from './assets/images/ReactFlow-icon.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          This is a demo project to work with <code>React Flow</code> just try to enter the link.
        </p>
        <img src={logo2} className="App-logo2" alt="logo"/>
        <p/>
        <Link to={ "/Flow" }>
          Access React Flow DEMO!!
        </Link>

      </header>
    </div>

  );
}

export default App;
