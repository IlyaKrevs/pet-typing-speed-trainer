import { createSlice } from "@reduxjs/toolkit";


interface IInitialState {
    symbols: {
        total: number,
        right: number,
        wrong: number
    },
    words: {
        total: number,
        allRight: number,
        withMistake: number,
    }
}

const initialState: IInitialState = {
    symbols: {
        total: 0,
        right: 0,
        wrong: 0,
    },
    words: {
        total: 0,
        allRight: 0,
        withMistake: 0,
    }

}



export const anylyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        symbolRight: (state) => {
            state.symbols.total += 1
            state.symbols.right += 1
        },
        symbolWrong: (state) => {
            state.symbols.total += 1
            state.symbols.wrong += 1
        },
        wordAllRight: (state) => {
            state.words.total += 1
            state.words.allRight += 1
        },
        wordWithMistake: (state) => {
            state.words.total += 1
            state.words.withMistake += 1
        },
        vipeData: () => {
            return initialState
        }
    }
})

export const { symbolRight, symbolWrong, wordAllRight, wordWithMistake, vipeData } = anylyticsSlice.actions

export default anylyticsSlice.reducer
