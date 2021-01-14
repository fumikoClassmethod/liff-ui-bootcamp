import React, { useEffect, useState } from "react";

import logo from './logo.svg';
import './App.css';

const { liff } = window;

function App() {
  const [signInFinished, setSignInFinished] = useState(false);
  const [signInFailed, setSignInFailed] = useState(false);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    liff
      .init({
        liffId: process.env.REACT_APP_LIFF_ID,
      })
      .then(async () => {
        // ログインしてるかチェック
        if (!liff.isLoggedIn()) {
          liff.login();
        }
        const profile = await liff.getProfile();
        setDisplayName(profile.displayName);
        setSignInFinished(true);
      })
      .catch((error) => {
        setSignInFailed(true);
        setSignInFinished(true);
      });
  }, []);

  if (!signInFinished) {
    return <div>Loading</div>;
  } else if (signInFailed) {
    return <div>ログイン失敗</div>;
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Name: {displayName}</p>
        </header>
      </div>
    );
  }
}

export default App;