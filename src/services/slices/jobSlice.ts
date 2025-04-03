import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jobState } from "../../utils/interfaces";
import { getAllJobsApi } from "../api/allApi";
import { searchValues } from "../../utils/interfaces";
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
        },
        clearFilter:(state)=>{
            state.filters.EmploymentTypefilterArray=[]
            state.filters.JobCategoryfilterArray=[]
            state.filters.JobLevelfilterArray=[]
            state.apiResponse.dummyAlljobs = state.apiResponse.alljobs

        },
        searchJobs:(state,searchValues:{payload:searchValues})=>{
            const {jobTitle,location} = searchValues.payload
            console.log(1);
            if(jobTitle&&location){
                state.apiResponse.dummyAlljobs = state.apiResponse.alljobs.filter(item=>{
                    return item.jobTitle.toLowerCase().includes(searchValues.payload.jobTitle.toLowerCase().trim()) && item.Location.toLowerCase().trim().includes(searchValues.payload.location.toLowerCase().trim())
                })
                state.pagination.currentPage=1
            }else if(jobTitle){
                state.apiResponse.dummyAlljobs = state.apiResponse.alljobs.filter(item=>{
                    return item.jobTitle.toLowerCase().includes(searchValues.payload.jobTitle.toLowerCase().trim())
                })
                state.pagination.currentPage=1
            }else if(location){
                state.apiResponse.dummyAlljobs = state.apiResponse.alljobs.filter(item=>{
                    return item.Location.toLowerCase().includes(searchValues.payload.location.toLowerCase().trim())
                })
                state.pagination.currentPage=1
            }
            else{
                state.apiResponse.dummyAlljobs = state.apiResponse.alljobs
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
export const { setCurrentPage, setEmploymentTypeFilterArray, setJobCategoryFilterArray, setJobLevelFilterArray ,filterJobs,searchJobs,clearFilter} = jobSlice.actions
export default jobSlice.reducer