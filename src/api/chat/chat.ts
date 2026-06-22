import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/url";

export const getChats = createAsyncThunk("user/getMessange",
    async () => {
        try {
            const { data } = await axiosRequest.get("users/get_users")
            return data
        } catch (error) {
            console.error(error);
        }
    }
)
export const getByIdChats = createAsyncThunk("user/getByIdChats",
    async (id: number) => {
        try {
            const { data } = await axiosRequest.get(`messages/get_messages/${id}?limit=40`)
            return data
        } catch (error) {
            console.error(error);
        }
    }
)
