import React, { memo } from 'react'
import styles from './Letter.module.css'


interface ILetter {
    letter: string,
    status: boolean | null,
    extra: boolean,
    showCarriage: boolean,
    isFirstSymbol: boolean,
}

export const Letter: React.FC<ILetter> = memo(({ letter, status, extra, showCarriage, isFirstSymbol }) => {


    // console.log('render letter', letter)

    let resultStyle = [styles.mainContainer]

    if (status !== null) {
        if (status) {
            resultStyle.push(styles.trueStatus)
        } else {
            resultStyle.push(styles.falseStatus)
        }
    }

    if (extra) {
        resultStyle = [styles.mainContainer, styles.extra]
    }


    let carriageStyle = [styles.carriage]
    if (isFirstSymbol) {
        carriageStyle.push(styles.startPos)
    } else {
        carriageStyle.push(styles.lastPos)
    }


    return (
        <div className={resultStyle.join(' ')}>
            {showCarriage && <div className={carriageStyle.join(' ')}></div>}
            {letter}
        </div>
    )
}
)

