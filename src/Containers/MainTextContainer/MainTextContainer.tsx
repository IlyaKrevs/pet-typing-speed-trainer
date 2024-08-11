import React, { useRef, useState } from 'react'
import styles from './MainTextContainer.module.css'
import { Word } from '../../Components/Word/Word'

import { symbolRight, symbolWrong, wordAllRight, wordWithMistake } from '../../redux/analyticsSlice/analyticsSlice'
import { useAppDispatch } from '../../redux/hooks'
import { AppStatus } from '../../App'

interface IMainTextContainer {
    statusTools: {
        status: AppStatus,
        startHandler: () => void,
        restartHandler: () => void
    }
}


export const MainTextContainer: React.FC<IMainTextContainer> = ({ statusTools }) => {

    let myString: string = 'about apple blanket bright bubbles castle cherry crisp dance dreams eagle family flower funny happy holiday island kitchen lemon magic meadow mirror mountain notice orange purple rabbit salmon season shine smile stable story summer talent thunder ticket travel tunnel water willow ticket travel tunnel water willow funny'

    let myArr = myString.split(' ')


    const inputRef = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState<boolean>(false)


    const [input, setInput] = useState<string>('')

    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [userResult, setUserResult] = useState<string[]>([])


    let dispatch = useAppDispatch()


    // main fn
    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {

        if (statusTools.status === 'wait') {
            statusTools.startHandler()
        }
        if (statusTools.status === 'finish') {
            return
        }

        let isDeleted = false

        if (input.length > e.target.value.length) {
            isDeleted = true
        }

        if (e.target.value.slice(-1) === ' ') {
            // next word

            if (newAllRightWord(e)) {
                dispatch(wordAllRight())
            } else {
                dispatch(wordWithMistake())
            }

            setUserResult(prev => [...prev, e.target.value.slice().trim()])
            setCurrentIndex(currentIndex + 1)
            setInput('')
        } else {
            // change input

            if (!isDeleted) {

                if (newRightSymbol(e)) {
                    dispatch(symbolRight())
                } else {
                    dispatch(symbolWrong())
                }
            }
            setInput(e.target.value)
        }
    }
    //


    // check functions
    function newRightSymbol(e: React.ChangeEvent<HTMLInputElement>): boolean {

        let newSymbol = e.target.value.slice(-1)
        let symbolIndex = e.target.value.length - 1

        if (newSymbol.toLowerCase() === myArr[currentIndex][symbolIndex]?.toLowerCase()) {
            return true
        }
        return false
    }
    function newAllRightWord(e: React.ChangeEvent<HTMLInputElement>): boolean {
        let lastIndexWord = e.target.value.length - 1
        let newWord = e.target.value.slice(0, lastIndexWord)

        if (newWord.toLowerCase() === myArr[currentIndex].toLowerCase()) {
            return true
        }
        return false
    }
    //


    return (
        <div className={styles.mainContainer}>
            {myArr.map((item, index) => {
                return <Word
                    key={index}
                    word={item}
                    userInput={index === currentIndex ? input : userResult[index]}
                    isActive={index === currentIndex}
                />
            })
            }



            {(!isFocused && statusTools.status === 'wait')
                &&
                <div
                    className={styles.blurContainer}
                    onClick={() => {
                        inputRef.current && inputRef.current.focus()
                        setIsFocused(true)
                    }}
                >
                    CLICK ME!
                </div>}



            {statusTools.status === 'finish'
                &&
                <div className={styles.blurContainer}>
                    <button
                        className={styles.restartButton}
                        onClick={() => {
                            statusTools.restartHandler()
                            setUserResult([])
                            setInput('')
                            setCurrentIndex(0)

                            if (inputRef.current) {
                                inputRef.current.focus()
                                setIsFocused(true)
                            }
                        }}
                    >
                        Restart
                    </button>
                </div>}



            <input
                className={styles.inputStyle}
                ref={inputRef}
                value={input}
                onChange={changeHandler}
                onBlur={() => {
                    if (statusTools.status === 'inProgress') {
                        inputRef.current && inputRef.current.focus()
                    } else {
                        setIsFocused(false)
                    }
                }}
            />
        </div>
    )
}

