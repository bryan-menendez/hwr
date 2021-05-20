import logo from './logo.svg';
import Detail from './pages/Detail'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        
        <Detail message="OOGA BOOGA"/>
        
      </header>
    </div>
  );
}

export default App;
