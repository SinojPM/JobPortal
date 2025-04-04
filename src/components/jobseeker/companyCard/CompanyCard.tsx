import { Box, Flex, Image, Text } from "@mantine/core"
import Tags from "../../tags/Tags"
import "./companycard.css"
import { companyDetails } from "../../../utils/interfaces"
const CompanyCard = ({data}:{data:companyDetails}) => {
  return (
    <Box className="companny-card-container" w={"100%"} p={"lg"} bd={"solid 2px neutral.3"}>
      <Flex direction={"column"} gap={"xs"}>
        <Box className="company-card-img" w={60} h={60}>
          <Image w={"100%"} h={"100%"} src={data.logo}/>
        </Box>
        <Box>
        <Text c={"neutral.5"}>{data.companyName}</Text>
        <Text c={"neutral.4"} size="xs">{data.location}</Text>
        </Box>
        <Text lineClamp={6} ta={"justify"} size="xs" c={"neutral.3"}>{data.companyProfile}</Text>
        <Flex w={"100%"} justify={"start"} gap={"xs"}>
          <Tags>{data.industry}</Tags>
          <Tags>{data.size} emplyees</Tags>
        </Flex>
      </Flex>
    </Box>
  )
}

export default CompanyCard