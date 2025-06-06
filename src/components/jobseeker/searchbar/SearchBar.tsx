import { Button, Flex, Grid, Select, Text, TextInput ,ComboboxItem,OptionsFilter} from "@mantine/core"
import "./searchbar.css"
import { useAppDispatch, useAppSelector } from "../../../redux/ReduxHooks"
import { useForm } from "@mantine/form"
import { searchJobs } from "../../../services/slices/jobSlice"
import { searchValues } from "../../../utils/interfaces"
import { searchCompanies } from "../../../services/slices/companySlice"
const SearchBar = ({insideCompany}:{insideCompany?:boolean}) => {
    const {locations} = useAppSelector(state=>state.jobReducer)
    const {locations:companyLocation} = useAppSelector(state=>state.companyReducer)
    const dispatch = useAppDispatch()
    const form = useForm({
        mode:"uncontrolled",
        initialValues:{
            jobTitle:"",
            companyName:"",
            location:"",
            companyLocation:""
        }
    })
    const optionsFilter: OptionsFilter = ({ options, search }) => {
        const splittedSearch = search.toLowerCase().trim().split(' ');
        return (options as ComboboxItem[]).filter((option) => {
          const words = option.label.toLowerCase().trim().split(' ');
          return splittedSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
        });
      };

    const handleSearch=(value:searchValues)=>{
        insideCompany?
        dispatch(searchCompanies(value))
        :
        dispatch(searchJobs(value))
        
    }
    return (
        <Flex direction={"column"} justify={"center"} align={"start"} px={{base:"xs",lg:"xl"}} w={"100%"} py={"lg"} className="jobseeker-search-bar">
            <form onSubmit={form.onSubmit((value)=>handleSearch(value))} className="jobSeeker-search-form">
                <Grid p={"xl"} w={"100%"} h={"auto"} justify={"space-evenly"} align={"center"} className="jobseeker-search-bar-search">
                    <Grid.Col span={{base:12,md:5}}>
                        {
                            insideCompany?
                            <TextInput {...form.getInputProps("companyName")} leftSection={<i className="fa-solid fa-search"></i>} placeholder="Company Name" className="jobseeker-searchbar-input" />
                            :
                            <TextInput {...form.getInputProps("jobTitle")} leftSection={<i className="fa-solid fa-search"></i>} placeholder="Job Title" className="jobseeker-searchbar-input" />
                        }
                    </Grid.Col>
                    <Grid.Col span={{base:12,md:5}}>
                        {
                            insideCompany?
                            <Select {...form.getInputProps("companyLocation")} searchable filter={optionsFilter} data={[" ",...companyLocation]} leftSection={<i className="fa-solid fa-location" ></i>} placeholder="location" className="jobseeker-searchbar-input"/>
                            :
                            <Select {...form.getInputProps("location")} searchable filter={optionsFilter} data={[" ",...locations]} leftSection={<i className="fa-solid fa-location" ></i>} placeholder="location" className="jobseeker-searchbar-input"/>
                        }
                    </Grid.Col>
                    <Grid.Col span={{base:12,md:2}}>
                        <Button type="submit" w={"100%"}>Search</Button>
                    </Grid.Col>
                </Grid>
            </form>
            {
                insideCompany?
                <Text c={"neutral.3"} size="sm" >Popular:FaceBook , Flycatch</Text>
                :
                <Text c={"neutral.3"} size="sm" >Popular:Ui/UX Designer</Text>
            }
        </Flex>
    )
}

export default SearchBar