import logo from './logo.svg';
import { useEffect, useRef } from 'react';
import './App.css';

function Header() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  )
}

function App() {
  const headerRef = useRef(null);

  useEffect(() => {
    let element = document.getElementById('sub_root');
    let obj = {}
    for(let key in element){
      obj[key] = element[key]
    }
    console.log('sub_root -->', obj);
  }, [])

  return (
    <div className="App" id="sub_root">
      {(() => {
        const _Header = (<Header ref={headerRef} key="header" props1="123" />)

        console.log('Header -->', _Header)
        return _Header
      })()}
    </div>
  );
}

export default App;
