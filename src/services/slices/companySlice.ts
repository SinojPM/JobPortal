import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { companyState, searchValues } from "../../utils/interfaces";
import { getAllCompaniesApi } from "../api/allApi";

const initialState:companyState = {
   apiResponse:{
        isPending:false,
        allCompanies:[],
        dummyAllCompanies:[]
   },
   locations:[],
   pagination:{
        currentPage:1
   },
   filters:{
        industryFilterArray:[],
        companySizeFilterArray:[],
   }
}
const companySlice = createSlice({
    name:"companySlice",
    initialState,
    reducers:{
        setCurrentPage:(state,value:{payload:number})=>{
            state.pagination.currentPage=value.payload
        },
        setIndustryFilterArray:(state,value:{payload:string[]})=>{
            state.filters.industryFilterArray = value.payload
        },
        setCompanySizeFilterArray:(state,value:{payload:string[]})=>{
            state.filters.companySizeFilterArray = value.payload
        },
        filterCompanies:(state)=>{
            const {companySizeFilterArray,industryFilterArray} = state.filters
            if(companySizeFilterArray.length===0&&industryFilterArray.length===0){
                state.apiResponse.dummyAllCompanies = state.apiResponse.allCompanies
                state.pagination.currentPage=1
            }else{
                state.apiResponse.dummyAllCompanies = state.apiResponse.allCompanies.filter(item=>companySizeFilterArray.includes(item.size) || industryFilterArray.includes(item.industry))
                state.pagination.currentPage=1
            }
        },
        clearFilter:(state)=>{
            state.filters.companySizeFilterArray=[]
            state.filters.industryFilterArray=[]
            state.apiResponse.dummyAllCompanies = state.apiResponse.allCompanies
            state.pagination.currentPage=1
        },
        searchCompanies:(state,searchValues:{payload:searchValues})=>{
                    const {companyLocation,companyName} = searchValues.payload
                    if(companyLocation&&companyName){
                        state.apiResponse.dummyAllCompanies = state.apiResponse.allCompanies.filter(item=>{
                            return item.companyName.toLowerCase().includes(searchValues.payload.companyName.toLowerCase().trim()) && item.location.toLowerCase().trim().includes(searchValues.payload.companyLocation.toLowerCase().trim())
                        })
                        state.pagination.currentPage=1
                    }else if(companyName){
                        state.apiResponse.dummyAllCompanies = state.apiResponse.allCompanies.filter(item=>{
                            return item.companyName.toLowerCase().includes(searchValues.payload.companyName.toLowerCase().trim())
                        })
                        state.pagination.currentPage=1
                    }else if(location){
                        state.apiResponse.dummyAllCompanies = state.apiResponse.allCompanies.filter(item=>{
                            return item.location.toLowerCase().includes(searchValues.payload.companyLocation.toLowerCase().trim())
                        })
                        state.pagination.currentPage=1
                    }
                    else{
                        state.apiResponse.dummyAllCompanies = state.apiResponse.allCompanies
                        state.pagination.currentPage=1
                    }
                }

    },
    extraReducers:(builder)=>{
        builder.addCase(getAllCompanies.pending,(state)=>{
            state.apiResponse.isPending=true
        })
        builder.addCase(getAllCompanies.fulfilled,(state,result)=>{
            state.apiResponse.allCompanies=result.payload
            state.apiResponse.dummyAllCompanies=result.payload
            state.apiResponse.isPending=false
            state.locations = state.apiResponse.allCompanies.map(item=>item.location)
        })
    }
})

export const getAllCompanies = createAsyncThunk("companySlice/getAllCompanies",async()=>{
    try{
        const response = await getAllCompaniesApi()
        return response
        
    }catch(err){
        return err
        
    }
})

export const {setCurrentPage,setCompanySizeFilterArray,setIndustryFilterArray,filterCompanies,clearFilter,searchCompanies} = companySlice.actions
export default companySlice.reducer