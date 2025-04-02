import { Center, Flex, Grid, Pagination, Stack, Text, Title } from "@mantine/core"
import "./findJobs.css"
import SearchBar from "../../../components/jobseeker/searchbar/SearchBar"
import FilterCollapse from "../../../components/jobseeker/jobfilter/FilterCollapse"
import { filterTypes, jobFilters } from "../../../utils/constants"
import JobCard from "../../../components/jobseeker/jobcard/JobCard"
import JobSeekerLayout from "../../../components/jobseekerlayout/JobSeekerLayout"
import { useAppDispatch, useAppSelector } from "../../../redux/ReduxHooks"
import { useEffect } from "react"
import { setCurrentPage, fetchAllJobs,filterJobs } from "../../../services/slices/jobSlice"
jobFilters


const FindJobs = () => {
  const dispatch = useAppDispatch()
  const {apiResponse:{dummyAlljobs},pagination:{currentPage},filters} = useAppSelector(state=>state.jobReducer)
  useEffect(()=>{
    dispatch(fetchAllJobs())
  },[])
  useEffect(()=>{
    dispatch(filterJobs())
  },[filters])
    
  const jobsPerPage = 6
  const startIndex = (currentPage-1)*jobsPerPage
  return (
    <JobSeekerLayout>
        <>
          <SearchBar />
          <Grid mt={"xl"}>
            <Grid.Col span={{ base: 12, lg: 3 }}>
              <Grid>
                <Grid.Col span={{ base: 12, md: 3, lg: 12 }}>
                  <FilterCollapse filterType={filterTypes.EmploymentType} items={jobFilters.filter(item => item.filterType === filterTypes.EmploymentType)} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 3, lg: 12 }}>
                  <FilterCollapse filterType={filterTypes.JobCategory} items={jobFilters.filter(item => item.filterType === filterTypes.JobCategory)} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 3, lg: 12 }}>
                  <FilterCollapse filterType={filterTypes.JobLevel} items={jobFilters.filter(item => item.filterType === filterTypes.JobLevel)} />
                </Grid.Col>
              </Grid>
            </Grid.Col>
            <Grid.Col w={"100%"} px={"xl"} span={{ base: 12, lg: 9 }}>
                <Flex justify={"start"} align={"center"} mb={"lg"}>
                    <Stack gap={"xs"}>
                      <Title order={2} c={"neutral.5"}>
                        All Jobs
                      </Title>
                      <Text size="xs" fw={"lighter"} c={"neutral.3"}>
                        showing {dummyAlljobs.length} jobs
                      </Text>
                    </Stack>
                </Flex>
                <Flex direction={"column"} gap={"md"} w={"100%"}>
                  {
                    dummyAlljobs?.length>0
                      ?
                      dummyAlljobs.slice(startIndex,startIndex+jobsPerPage).map((job)=>(
                        <JobCard data={job} key={`${job.id}`}/>
                      ))
                      :
                      <Center>No Jobs To Display.....</Center>
                  }
                </Flex>
                <Center my={"xl"}>
                  <Pagination onChange={(value)=>dispatch(setCurrentPage(value))} radius={"xl"} total={Math.ceil(dummyAlljobs.length/jobsPerPage)} />
                  </Center>
            </Grid.Col>
          </Grid>
        </>
    </JobSeekerLayout>
   
  )
}

export default FindJobs