import {  createSlice } from '@reduxjs/toolkit'
import type { IData } from '../../shared/types/chatType'
import { getChats } from '../../api/chat/chat'

export interface CounterState {
    chats: IData[],
    loading: boolean
}

const initialState: CounterState = {
    chats: [],
    loading: false
}




export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getChats.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getChats.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(getChats.fulfilled, (state,action) => {
            state.chats = action.payload
            state.loading=false
        })
    }
})


export default chatSlice.reducer