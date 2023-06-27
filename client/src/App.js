import './App.css';
import React from 'react';
import { useState} from 'react';
import { BrowserRouter as Router, Route, Switch as RSwitch } from 'react-router-dom';

const Autorefresh = (props) => {
  const [link, setLink] = useState('');
  const [delay, setDelay] = useState('');

  const handleSubmit = async (check_data) => {
    check_data.preventDefault();
    const request = {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify ({
        link,
        delay,
      })
    };
    console.log(link, delay);
    try {
      const response = await fetch('/', request);
      const data = await response.json();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label><p></p>
        <input onChange={(check_data) => setLink(check_data.target.value)} type="text" placeholder="Link" /><p></p>
        <label htmlFor="password">Password</label><p></p>
        <input onChange={(check_data) => setDelay(check_data.target.value)} type="text" placeholder="Delay" /><p></p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
function App() {
  return (
    <Router>
      <div className='App'>
      <RSwitch>
        <Route exact path="/" component={Autorefresh} />
      </RSwitch>
      </div>
    </Router>
  );
}

export default App;
