import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name:'blog',
    initialState:{
        blog:[]
    },
    reducers:{
        addBlog:(state,action) =>{
            state.blog= action.payload;
        },
        removeBlog:(state,action) =>{
            state.blog = null;
        }
    }
})

export const {addBlog,removeBlog} = blogSlice.actions;
export default blogSlice.reducer;