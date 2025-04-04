import { Button, Center, Flex, Grid, Pagination, Skeleton, Stack, Text, Title } from "@mantine/core"
import "./findJobs.css"
import SearchBar from "../../../components/jobseeker/searchbar/SearchBar"
import FilterCollapse from "../../../components/jobseeker/filter/FilterCollapse"
import { filterTypes, jobFilter } from "../../../utils/constants"
import JobCard from "../../../components/jobseeker/jobcard/JobCard"
import JobSeekerLayout from "../../../components/jobseekerlayout/JobSeekerLayout"
import { useAppDispatch, useAppSelector } from "../../../redux/ReduxHooks"
import { useEffect } from "react"
import { setCurrentPage, fetchAllJobs, filterJobs, clearFilter } from "../../../services/slices/jobSlice"
import { jobsPerPage } from "../../../utils/constants"


const FindJobs = () => {
  const dispatch = useAppDispatch()
  const { apiResponse: { dummyAlljobs,isPending }, pagination: { currentPage } } = useAppSelector(state => state.jobReducer)
  useEffect(() => {
    dispatch(fetchAllJobs())
  }, [])

  const startIndex = (currentPage - 1) * jobsPerPage

  return (
    <JobSeekerLayout>
      <>
        <SearchBar />
        <Grid mt={"xl"} >
          <Grid.Col span={{ base: 12, lg: 3 }}>
            <Grid>
              <Grid.Col span={{ base: 12, xs: 4, md: 4, lg: 12 }}>
                <FilterCollapse filterType={filterTypes.EmploymentType} items={jobFilter.employmentType} />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 4, md: 4, lg: 12 }}>
                <FilterCollapse filterType={filterTypes.JobCategory} items={jobFilter.jobCategory} />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 4, md: 4, lg: 12 }}>
                <FilterCollapse filterType={filterTypes.JobLevel} items={jobFilter.jobLevel} />
              </Grid.Col>
            </Grid>
            <Flex mt={"lg"} justify={"center"} align={"center"} gap={"xl"}>
              <Button onClick={() => dispatch(clearFilter())} color={"neutral.5"}>clear</Button>
              <Button onClick={() => dispatch(filterJobs())}>Apply</Button>
            </Flex>
          </Grid.Col>
          <Grid.Col w={"100%"} px={"xl"} span={{ base: 12, lg: 9 }}>
            <Flex justify={"start"} align={"center"} mb={"lg"}>
              <Stack gap={"xs"}>
                <Title order={2} c={"neutral.5"}>
                  All Jobs
                </Title>
                <Text size="xs" fw={"lighter"} c={"neutral.3"}>
                  showing {dummyAlljobs?.length} jobs
                </Text>
              </Stack>
            </Flex>
            <Flex direction={"column"} gap={"md"} w={"100%"}>
              {
                isPending?
                  Array(6).map(()=>(
                    <Skeleton c="brand.9" height={400} mt={6} width="100%" />
                  ))
                  :
                dummyAlljobs?.length > 0
                  ?
                  dummyAlljobs?.slice(startIndex, startIndex + jobsPerPage).map((job) => (
                    <JobCard data={job} key={`${job.id}`} />
                  ))
                  :
                  <Center>No Jobs To Display.....</Center>
              }
            </Flex>
            <Center my={"xl"}>
              <Pagination value={currentPage} onChange={(value) => dispatch(setCurrentPage(value))} radius={"xl"} total={Math.ceil(dummyAlljobs?.length / jobsPerPage)} />
            </Center>
          </Grid.Col>
        </Grid>
      </>
    </JobSeekerLayout>

  )
}

export default FindJobs