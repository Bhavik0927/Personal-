import { createSlice } from "@reduxjs/toolkit";


const SaveBlogs = createSlice({
    name:'saveblogs',
    initialState:{
        saveblogs:[]
    },
    reducers:{
        addSaveBlog:(state,action) =>{
            state.saveblogs= action.payload;
        },
        removeSaveBlog:(state,action) =>{
            state.saveblogs = null;
        }
    }
});

export const {addSaveBlog,removeSaveBlog} = SaveBlogs.actions;
export default SaveBlogs.reducer;