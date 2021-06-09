import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import URL from "@config";

interface IUserManagement {
    count: number;
    users: Array<string>;
    user: Record<string, never>;
}

const initialState: IUserManagement = {
    count: 88,
    users: [],
    user: {},
};

const userManagementSlice = createSlice({
    name: "userManagement",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setUsers, setUser } = userManagementSlice.actions;

export const selectUser = (state) => state.userManagement.user;

export const getUserRedux = (data) => async (dispatch) => {
    await axios.get(URL.users_api + `/${data._id}`).then((res) => {
        if (res) {
            dispatch(setUser(res.data));
        }
    });
    // dispatch(setUsers(value));
};

export default userManagementSlice.reducer;
