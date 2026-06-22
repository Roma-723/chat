import { createSlice } from '@reduxjs/toolkit'
import type { IData, Messanges } from '../../shared/types/chatType'
import { getByIdChats, getChats } from '../../api/chat/chat'

export interface CounterState {
    chats: IData[]
    loading: boolean
    currentChat: Messanges[]
    error: string | null
}

const initialState: CounterState = {
    chats: [],
    loading: false,
    currentChat: [],
    error: null
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getChats.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getChats.rejected, (state) => {
                state.loading = false
            })
            .addCase(getChats.fulfilled, (state, action) => {
                state.chats = action.payload
                state.loading = false
            })
            .addCase(getByIdChats.pending, (state) => {
                state.loading = true
                state.currentChat = []  
            })
            .addCase(getByIdChats.fulfilled, (state, action) => {
                state.currentChat = action.payload ?? []
                state.loading = false
            })
            .addCase(getByIdChats.rejected, (state) => {
                state.loading = false
            })
    }
})

export default chatSlice.reducer