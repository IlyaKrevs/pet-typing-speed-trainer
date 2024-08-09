import React from 'react';
import styles from './App.module.css'

import { MainTextContainer } from './Containers/MainTextContainer/MainTextContainer';



function App() {
  return (
    <div className={styles.App}>
      <MainTextContainer />
    </div>
  );
}

export default App;

