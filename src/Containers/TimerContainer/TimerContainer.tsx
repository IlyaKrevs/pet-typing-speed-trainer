import React, { useEffect, useState } from 'react'
import styles from './TimerContainer.module.css'
import { AppStatus } from '../../App'

interface ITimerContainer {
    status: AppStatus,
    finishHandler: () => void,
}

export const TimerContainer: React.FC<ITimerContainer> = ({ status, finishHandler }) => {

    const time = 10 // only for tests

    const [timer, setTimer] = useState<number>(time)


    useEffect(() => {

        if (status === 'inProgress') {
            const id = setInterval(() => {
                setTimer(prev => {
                    if (prev === 1) {
                        setTimeout(finishHandler, 0);
                        clearInterval(id)
                        return 0;
                    }
                    return prev - 1
                });
            }, 1000);

            return () => {
                clearInterval(id)
            }
        } else {
            setTimer(time)
        }


    }, [status])


    return (
        <div className={styles.mainContainer}>
            {status === 'finish' ? 'Finish!' : timer + ' sec'}
        </div>
    )
}
