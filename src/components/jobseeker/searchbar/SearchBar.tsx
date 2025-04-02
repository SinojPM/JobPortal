import { Button, Flex, Grid, Select, Text, TextInput ,ComboboxItem,OptionsFilter} from "@mantine/core"
import "./searchbar.css"
import { useAppSelector } from "../../../redux/ReduxHooks"
import { useForm } from "@mantine/form"
const SearchBar = () => {
    const {locations} = useAppSelector(state=>state.jobReducer)
    const form = useForm({
        mode:"uncontrolled",
        initialValues:{
            jobTitle:"",
            location:""
        }
    })
    const optionsFilter: OptionsFilter = ({ options, search }) => {
        const splittedSearch = search.toLowerCase().trim().split(' ');
        return (options as ComboboxItem[]).filter((option) => {
          const words = option.label.toLowerCase().trim().split(' ');
          return splittedSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
        });
      };
    return (
        <Flex direction={"column"} justify={"center"} align={"start"} px={{base:"xs",lg:"xl"}} w={"100%"} py={"lg"} className="jobseeker-search-bar">
            <form onSubmit={form.onSubmit((value)=>console.log(value))} className="jobSeeker-search-form">
                <Grid p={"xl"} w={"100%"} h={"auto"} justify={"space-evenly"} align={"center"} className="jobseeker-search-bar-search">
                    <Grid.Col span={{base:12,md:5}}>
                        <TextInput {...form.getInputProps("jobTitle")} leftSection={<i className="fa-solid fa-search"></i>} placeholder="Job Title" className="jobseeker-searchbar-input" />
                    </Grid.Col>
                    <Grid.Col span={{base:12,md:5}}>
                        <Select {...form.getInputProps("location")} searchable filter={optionsFilter} data={["",...locations]} leftSection={<i className="fa-solid fa-location" ></i>} placeholder="location" className="jobseeker-searchbar-input"/>
                    </Grid.Col>
                    <Grid.Col span={{base:12,md:2}}>
                        <Button type="submit" w={"100%"}>Search</Button>
                    </Grid.Col>
                </Grid>
            </form>
            <Text c={"neutral.3"} size="sm" >Popular:Ui/UX Designer</Text>
        </Flex>
    )
}

export default SearchBar