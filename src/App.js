import logo from './logo.svg';
import logo2 from './ReactFlow-icon.png';
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
        <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
          Access React Flow DEMO!!
        </a>
      </header>
    </div>
  );
}

export default App;
