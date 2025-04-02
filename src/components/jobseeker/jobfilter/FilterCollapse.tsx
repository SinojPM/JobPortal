import {  Checkbox, Collapse, Flex, Text } from "@mantine/core"
import "./FilterCollapse.css"
import { useDisclosure } from "@mantine/hooks"
import { filterType, JobFilter } from "../../../utils/interfaces"
import { useAppDispatch } from "../../../redux/ReduxHooks"
import { setJobLevelFilterArray,setEmploymentTypeFilterArray,setJobCategoryFilterArray } from "../../../services/slices/jobSlice"

const FilterCollapse = ({items,filterType}:{items:JobFilter[],filterType:filterType}) => {
    const [opened, { toggle }] = useDisclosure()
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
                <Checkbox.Group onChange={(value)=>handleFilter(filterType,value)}>
                    {
                        items.map((item)=>(
                            <Checkbox c={"neutral.3"} mb={"xs"} value={item.filterValue} label={item.filterValue} />
                        ))
                    }
                    
                </Checkbox.Group>
            </Collapse>

        </Flex>
    )
}

export default FilterCollapse