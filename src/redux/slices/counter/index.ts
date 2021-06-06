import { createSlice } from "@reduxjs/toolkit";

interface ICounter {
    count: number;
}

const initialState: ICounter = {
    count: 12,
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increase: (state) => {
            state.count++;
        },
        decrease: (state) => {
            state.count--;
        },
    },
});

export const { increase, decrease } = counterSlice.actions;

export default counterSlice.reducer;
