import { Box, Flex } from "@mantine/core"
import Navbar from "../jobseeker/navbar/Navbar"
import Sidebar from "../jobseeker/sidebar/Sidebar"
import "./jobSeekerlayout.css"

const JobSeekerLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <Flex mah={"100vh"} className="find-jobs-container">
        <Sidebar/>
        <Box w={"100%"} className="find-jobs-contents">
            <Navbar/>
            {
                children
            }
        </Box>
    </Flex>
  )
}

export default JobSeekerLayout