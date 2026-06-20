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
