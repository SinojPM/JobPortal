import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jobState } from "../../utils/interfaces";
import { getAllJobsApi } from "../api/allApi";
const initialState: jobState = {
    apiResponse: {
        isPending: false,
        alljobs: [],
        dummyAlljobs: []
    },
    locations:[],
    pagination: {
        currentPage: 1,
        displayedJobs: []

    },
    filters: {
        EmploymentTypefilterArray: [],
        JobCategoryfilterArray: [],
        JobLevelfilterArray: [],
    }
}
const jobSlice = createSlice({
    name: "jobSlice",
    initialState,
    reducers: {
        setCurrentPage: (state, currentPage) => {
            state.pagination.currentPage = currentPage.payload
        },
        setEmploymentTypeFilterArray: (state, data: { payload: string[] }) => {
            state.filters.EmploymentTypefilterArray = data.payload
        },
        setJobCategoryFilterArray: (state, data: { payload: string[] }) => {
            state.filters.JobCategoryfilterArray = data.payload
        },
        setJobLevelFilterArray: (state, data: { payload: string[] }) => {
            state.filters.JobLevelfilterArray = data.payload
        },
        filterJobs:(state)=>{
            const {EmploymentTypefilterArray,JobCategoryfilterArray,JobLevelfilterArray} = state.filters
            if(EmploymentTypefilterArray.length===0&&JobCategoryfilterArray.length===0&&JobLevelfilterArray.length===0){
                state.apiResponse.dummyAlljobs = state.apiResponse.alljobs
                state.pagination.currentPage=1
            }else{
                state.apiResponse.dummyAlljobs = state.apiResponse.alljobs.filter(item=>EmploymentTypefilterArray.includes(item.jobType) || JobCategoryfilterArray.includes(item.category) || JobLevelfilterArray.includes(item.jobLevel))
                state.pagination.currentPage=1
            }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllJobs.pending, (state) => {
            state.apiResponse.isPending = true
        })
        builder.addCase(fetchAllJobs.fulfilled, (state, data) => {
            state.apiResponse.alljobs = data.payload
            state.apiResponse.dummyAlljobs = data.payload
            state.apiResponse.isPending = false
            state.locations = state.apiResponse.alljobs.map(item=>item.Location)
        })
    }
})

export const fetchAllJobs = createAsyncThunk("jobSlice/fetchAllJobs", async () => {
    try {
        const response = await getAllJobsApi()
        return response
    } catch (err) {
        return err

    }
})
export const { setCurrentPage, setEmploymentTypeFilterArray, setJobCategoryFilterArray, setJobLevelFilterArray ,filterJobs} = jobSlice.actions
export default jobSlice.reducer