import React, { memo } from 'react'
import styles from './AnalyticsContainer.module.css'
import { useAppSelector } from '../../redux/hooks'

interface IAnalyticsContainer {

}


export const AnalyticsContainer: React.FC<IAnalyticsContainer> = () => {

    const selectAnalytics = useAppSelector(state => state.analyticsReducer)

    const symbolsArr: IAnalyticsItem[] = Object.entries(selectAnalytics.symbols).map(([key, value]) => {
        return {
            title: key,
            value: value
        }
    })

    const wordsArr: IAnalyticsItem[] = Object.entries(selectAnalytics.words).map(([key, value]) => {
        return {
            title: key,
            value: value
        }
    })



    const result: IAnalyticsGroup[] = [{
        title: 'Symbols',
        arr: symbolsArr
    }, {
        title: 'Words',
        arr: wordsArr
    }]

    return (
        <div className={styles.mainContainter}>
            {result.map((item, index) => <AnalyticsGroup
                key={index}
                title={item.title}
                arr={item.arr}
            />)}
        </div>
    )
}



interface IAnalyticsGroup {
    title: string,
    arr: IAnalyticsItem[]
}

const AnalyticsGroup: React.FC<IAnalyticsGroup> = ({ title, arr }) => {

    return (
        <div className={styles.groupContainer}>
            <div className={styles.groupTitle}>
                {title}:
            </div>
            <div className={styles.groupValue}>
                {arr.map((item, index) => <AnalyticsItem
                    key={index}
                    title={item.title}
                    value={item.value}
                />)}
            </div>
        </div>
    )
}


interface IAnalyticsItem {
    title: string,
    value: number,
}

const AnalyticsItem: React.FC<IAnalyticsItem> = memo(({ title, value }) => {

    return (
        <div className={styles.itemContainer}>
            <div className={styles.itemTitle}>
                {title}:
            </div>
            <div className={styles.itemValue}>
                {value}
            </div>
        </div>
    )
}
)
