import React from 'react'
import styles from './Word.module.css'
import { Letter } from '../Letter/Letter'

interface IWord {
    word: string,
    userInput: string,
    isActive: boolean
}

export const Word: React.FC<IWord> = ({ word, userInput, isActive }) => {

    let basicLetters = word.split('')


    let userLetters: string[] = [];
    let extraLetters: string | string[]

    let resultLetters = [...basicLetters]


    if (userInput !== undefined) {
        userLetters = userInput.split('')
        extraLetters = userInput.slice(basicLetters.length)

        if (extraLetters.length) {
            extraLetters = extraLetters.split('')
            resultLetters.push(...extraLetters)
        }
    }


    let carriagePos: number;
    let isFirst = true

    if (isActive) {
        carriagePos = userInput.length === 0 ? 0 : userInput.length - 1
        if (userInput.length > 0) {
            isFirst = false
        }
    }

    return (
        <div className={styles.mainContainer}>
            {resultLetters.map((item, index) => {
                return <Letter
                    letter={item}
                    status={userLetters[index] ? (item === userLetters[index]) : null}
                    extra={index > (basicLetters.length - 1)}
                    showCarriage={carriagePos === index}
                    isFirstSymbol={isFirst}
                />
            })}
        </div>
    )
}
