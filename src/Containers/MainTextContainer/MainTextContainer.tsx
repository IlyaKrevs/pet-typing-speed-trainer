import React, { useState } from 'react'
import styles from './MainTextContainer.module.css'
import { Word } from '../../Components/Word/Word'

interface IMainTextContainer {

}

export const MainTextContainer: React.FC<IMainTextContainer> = () => {

    let myString: string = 'about apple blanket bright bubbles castle cherry crisp dance dreams eagle family flower funny happy holiday island kitchen lemon magic meadow mirror mountain notice orange purple rabbit salmon season shine smile stable story summer talent thunder ticket travel tunnel water willow ticket travel tunnel water willow funny'

    let arr = myString.split(' ')


    const [input, setInput] = useState<string>('')

    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [userResult, setUserResult] = useState<string[]>([])


    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {

        if (e.target.value.slice(-1) === ' ') {
            setUserResult(prev => [...prev, e.target.value.slice(0, e.target.value.length - 1)])
            setCurrentIndex(currentIndex + 1)
            setInput('')
        } else {
            setInput(e.target.value)
        }
    }




    return (
        <div className={styles.mainContainer}>
            {arr.map((item, index) => {
                return <Word
                    word={item}
                    userInput={index === currentIndex ? input : userResult[index]}
                    isActive={index === currentIndex}
                />
            })
            }

            <input value={input} onChange={changeHandler} />
        </div>
    )
}

