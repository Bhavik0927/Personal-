import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name:'blog',
    initialState:{
        blog:null
    },
    reducers:{
        addBlog:(state,action) =>{
            state.user= action.payload;
        },
        removeBlog:(state,action) =>{
            state.user = null;
        }
    }
})

export const {addBlog,removeBlog} = blogSlice.actions;
export default blogSlice.reducer;