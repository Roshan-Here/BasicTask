import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Edatas: [],
};

const setEmployeeSlice = createSlice({
    name: "Employeedatas",
    initialState,
    reducers: {
        setEdatas: (state, action) => {
            return {
                ...state,
                Edatas: action.payload
            }
        }
    }
})

export const { setEdatas } = setEmployeeSlice.actions;
export default setEmployeeSlice.reducer;