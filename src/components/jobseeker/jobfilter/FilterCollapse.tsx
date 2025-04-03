import {  Checkbox, Collapse, Flex, Text } from "@mantine/core"
import "./FilterCollapse.css"
import { useDisclosure } from "@mantine/hooks"
import { filterType, JobFilter } from "../../../utils/interfaces"
import { useAppDispatch, useAppSelector } from "../../../redux/ReduxHooks"
import { setJobLevelFilterArray,setEmploymentTypeFilterArray,setJobCategoryFilterArray } from "../../../services/slices/jobSlice"

const FilterCollapse = ({items,filterType}:{items:JobFilter[],filterType:filterType}) => {
    const [opened, { toggle }] = useDisclosure()
    const {EmploymentTypefilterArray,JobCategoryfilterArray,JobLevelfilterArray} = useAppSelector(state=>state.jobReducer.filters)
    const dispatch = useAppDispatch()
    const handleFilter = (filterType:filterType,value:string[])=>{
        switch(filterType){
            case "Employment Type":
                dispatch(setEmploymentTypeFilterArray(value))
                break
            case "Job Category":{
                dispatch(setJobCategoryFilterArray(value))
                break
            }
            case "Job Level":{
                dispatch(setJobLevelFilterArray(value))
                break
            }
        }
    }
    const setfilterValue = (filterType:filterType)=>{
        switch(filterType){
            case "Employment Type":
                return EmploymentTypefilterArray
                break
            case "Job Category":{
                return JobCategoryfilterArray
                break
            }
            case "Job Level":{
                return JobLevelfilterArray
                break
            }
        }
    }
    
    return (
        <Flex direction={"column"} w={"100%"} px={"xl"} gap={"xs"}>
            <Flex justify={"space-between"} align={"center"} onClick={toggle}>
                <Text c={"neutral.5"}>{filterType}</Text>
                {
                    opened ?
                        <i className="fa-solid fa-chevron-up"></i>
                        :
                        <i className="fa-solid fa-chevron-down"></i>
                }
            </Flex>
            <Collapse in={opened}>
                <Checkbox.Group value={setfilterValue(filterType)} onChange={(value)=>handleFilter(filterType,value)}>
                    {
                        items.map((item,index)=>(
                            <Checkbox key={index} c={"neutral.3"} mb={"xs"} value={item.filterValue} label={item.filterValue} />
                        ))
                    }
                    
                </Checkbox.Group>
            </Collapse>

        </Flex>
    )
}

export default FilterCollapse