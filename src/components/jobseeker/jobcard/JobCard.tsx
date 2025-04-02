import { JobDetails } from "../../../utils/interfaces"
import Tags from "../../tags/Tags"
import "./JobCard.css"
import { Box, Flex, Grid, Image, Title,Text, Button } from "@mantine/core"


const JobCard = ({data}:{data:JobDetails}) => {
    return (
        <Grid w={"100%"} p={"md"} className="jobCard-container">
            <Grid.Col span={{ lg: 6 }}>
                <Flex gap={"md"}>
                    <Box className="JobCard-logo">
                        <Image src={data.profileImg} />
                    </Box>
                    <Flex direction={"column"}>
                        <Title order={3} c={"neutral.5"}>{data.jobTitle}</Title>
                        <Flex gap={"sm"}>
                            <Text c={"neutral.3"} size="xs" fw={"normal"}>{data.companyName}</Text>
                            <Text c={"neutral.3"} size="xs" fw={"normal"}>|</Text>
                            <Text c={"neutral.3"} size="xs" fw={"normal"}>{data.Location}</Text>
                        </Flex>
                        <Flex wrap={"wrap"} gap={"xs"}>
                    <Tags>{data.jobType}</Tags>
                    <Tags>{data.category}</Tags>
                    <Tags>{data.jobLevel}</Tags>
                    
                </Flex>
                    </Flex>
                </Flex>
            </Grid.Col>
            <Grid.Col span={{ lg: 4 }}>
            </Grid.Col>
            <Grid.Col className="jobCard-right" span={{ lg: 2 }}>
                <Button w={"100%"}>Apply</Button>
                <Text c={"neutral.4"} size="xs">{data.salary}$/month</Text>
            </Grid.Col>

        </Grid>
    )
}

export default JobCard