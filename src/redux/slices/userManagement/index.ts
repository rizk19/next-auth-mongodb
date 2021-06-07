import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import URL from "@config";

interface IUserManagement {
    count: number;
    users: Array<string>;
}

const initialState: IUserManagement = {
    count: 88,
    users: [],
};

const userManagementSlice = createSlice({
    name: "userManagement",
    initialState,
    reducers: {
        increment: (state) => {
            state.count++;
        },
        decrement: (state) => {
            state.count--;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});

export const { increment, decrement, setUsers } = userManagementSlice.actions;

export const getUsersRedux = (data) => async (dispatch) => {
    await axios.get(URL.users_api + `/${data._id}?coba=ah`).then((res) => {
        console.log("rrrr", res.data);
        dispatch(setUsers(res.data));
    });
    // dispatch(setUsers(value));
};

export default userManagementSlice.reducer;
