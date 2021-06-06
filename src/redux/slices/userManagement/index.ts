import { createSlice } from "@reduxjs/toolkit";

interface IUserManagement {
    count: number;
}

const initialState: IUserManagement = {
    count: 88,
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
    },
});

export const { increment, decrement } = userManagementSlice.actions;

export default userManagementSlice.reducer;
