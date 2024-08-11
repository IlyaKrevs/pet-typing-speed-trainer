import React, { useState } from 'react';
import styles from './App.module.css'

import { MainTextContainer } from './Containers/MainTextContainer/MainTextContainer';
import { AnalyticsContainer } from './Containers/AnalyticsContainer/AnalyticsContainer';
import { TimerContainer } from './Containers/TimerContainer/TimerContainer';

import { vipeData } from './redux/analyticsSlice/analyticsSlice';
import { useAppDispatch } from './redux/hooks';

export type AppStatus = 'wait' | 'inProgress' | 'finish'

function App() {

  const [status, setStatus] = useState<AppStatus>('wait')

  const dispatch = useAppDispatch()

  function finishHandler() {
    setStatus('finish')
  }

  function startHandler() {
    setStatus('inProgress')
  }

  function restartHandler() {
    setStatus('wait')
    dispatch(vipeData())
  }


  const statusTools = {
    status,
    startHandler,
    restartHandler,
  }

  return (
    <div className={styles.App}>
      <div className={styles.content}>
        <TimerContainer
          status={status}
          finishHandler={finishHandler}
        />
        <AnalyticsContainer />
        <MainTextContainer
          statusTools={statusTools}
        />
      </div>
    </div>
  );
}

export default App;

