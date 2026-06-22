import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosRequest, saveToken, saveRefreshToken } from "../../utils/url"

interface LoginPayload {
  username: string
  password: string
}

export const loginUser = createAsyncThunk<string, LoginPayload, { rejectValue: string }>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.post(
        "/auth/login",
        { username: payload.username, password: payload.password },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
      saveToken(data.access_token)
      if (data.refresh_token) {
        saveRefreshToken(data.refresh_token)
      }
      return data.access_token
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)