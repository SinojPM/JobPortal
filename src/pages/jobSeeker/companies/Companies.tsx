import { Button, Center, Flex, Grid, Pagination, Skeleton, Stack, Text, Title } from "@mantine/core"
import SearchBar from "../../../components/jobseeker/searchbar/SearchBar"
import JobSeekerLayout from "../../../components/jobseekerlayout/JobSeekerLayout"
import FilterCollapse from "../../../components/jobseeker/filter/FilterCollapse"
import { companiesPerPage, filterTypes, jobFilter } from "../../../utils/constants"
import { clearFilter } from "../../../services/slices/companySlice"
import CompanyCard from "../../../components/jobseeker/companyCard/CompanyCard"
import { useEffect } from "react"
import { filterCompanies, getAllCompanies, setCurrentPage } from "../../../services/slices/companySlice"
import { useAppDispatch, useAppSelector } from "../../../redux/ReduxHooks"

const Companies = () => {
  const dispatch = useAppDispatch()
  const { apiResponse: { dummyAllCompanies, isPending },pagination:{currentPage} } = useAppSelector(state => state.companyReducer)
  useEffect(() => {
    dispatch(getAllCompanies())
  }, [])
  const startIndex = (currentPage-1)*companiesPerPage
  return (
    <JobSeekerLayout>
      <SearchBar insideCompany={true} />
      <Grid mt={"xl"} w={"100%"} className="jobseeker-company">
        <Grid.Col span={{ base: 12, lg: 3 }}>
          <Grid>
            <Grid.Col span={{ base: 12, xs: 6, lg: 12 }}>
              <FilterCollapse filterType={filterTypes.Industry} items={jobFilter.industry} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 6, lg: 12 }}>
              <FilterCollapse filterType={filterTypes.CompanySize} items={jobFilter.companySize} />
            </Grid.Col>
          </Grid>
          <Flex mt={"lg"} justify={"center"} align={"center"} gap={"xl"}>
            <Button onClick={() => dispatch(clearFilter())} color={"neutral.5"}>clear</Button>
            <Button onClick={() => dispatch(filterCompanies())}>Apply</Button>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 9 }} w={"100%"} px={{ base: "md", md: "xl" }}>
          <Flex justify={"start"} align={"center"} mb={"lg"}>
            <Stack gap={"xs"}>
              <Title order={2} c={"neutral.5"}>
                All Companies
              </Title>
              <Text size="xs" fw={"lighter"} c={"neutral.3"}>
                showing {dummyAllCompanies.length} Companies
              </Text>
            </Stack>
          </Flex>
          <Grid mt={"xl"} w={"100%"} gutter={"md"}>
            {
              isPending ?
                Array(10).fill("skelton2").map((item,index)=>(
                  <Grid.Col key={`${item}${index}`} span={{ base: 12, sm: 6 }}>
                  <Skeleton c="brand.9" height={300} mt={6} width="100%" />
                </Grid.Col>
                ))
                :
                dummyAllCompanies?.length > 0 ?
                  dummyAllCompanies?.slice(startIndex,startIndex+companiesPerPage).map((company,index) => (
                    <Grid.Col key={index} span={{ base: 12, sm: 6 }}>
                      <CompanyCard data={company} />
                    </Grid.Col>
                  ))
                  :
                  <Center>
                    No Companies to display......
                  </Center>
            }
          </Grid>
          <Center my={"xl"}>
            <Pagination value={currentPage} onChange={(value)=>dispatch(setCurrentPage(value))} total={Math.ceil(dummyAllCompanies.length/companiesPerPage)} radius={"xl"} />
          </Center>

        </Grid.Col>
      </Grid>
    </JobSeekerLayout>
  )
}

export default Companies