import { Avatar, Divider, Flex, Group, Image, Menu, Stack, Text } from "@mantine/core"
import "./sidebar.css"
import logo2 from "/assets/Logo 2.svg"
import { useLocation, useNavigate } from "react-router-dom"
import { pathConstants } from "../../../utils/pathConstants"
import { jobSeekerPages } from "../../../utils/constants"
import { useAppSelector } from "../../../redux/ReduxHooks"


const Sidebar = ({opened}:{opened?:boolean}) => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const {username,email} = useAppSelector(state=>state.authReducer.auth.userDetails)
  const handleLogout = () => {
    sessionStorage.removeItem("token")
    navigate(pathConstants.login)
  }
  return (
    <>
      <Stack visibleFrom={opened?"0":"md"} px={"lg"} py={"xl"} className="jobseeker-sidebar" w={300} h={"100vh"} bg={"brand.1"}>
        <Image className="jobseeker-sidebar-logo" w={"60%"} src={logo2} />
        <Stack mt={"xl"} gap={0} c={"neutral.4"} className="jobseeker-sidebar-list">
          {
            jobSeekerPages.map((item) => (
              <Group onClick={()=>navigate(item.pathname)} key={item.pathname} className={`jobseeker-sidebar-listItem ${pathname===item.pathname&&"active"}`}>
                <i className={item.icon}></i>
                <Text size="sm">{item.page}</Text>
              </Group>
            ))
          }
        </Stack>
        <Divider size={"md"} color={"neutral.2"}/>
        <Stack gap={0} c={"neutral.4"} className="jobseeker-sidebar-list2">
          <Group className="jobseeker-sidebar-listItem">
            <i className="fa-solid fa-gear"></i>
            <Text size="sm">Settings</Text>
          </Group>
          <Menu width={"200"}>
            <Menu.Target>
              <Group>
                <Avatar className="jobseeker-sidebar-user" size={"lg"} color="green.6" bg={"green.2"} radius="xl">SPM</Avatar>
                <Flex className="jobseeker-sidebar-user" direction={"column"}>
                  <Text c={"neutral.6"}>{username}</Text>
                  <Text size="xs">{email}</Text>
                </Flex>
              </Group>
            </Menu.Target>
            <Menu.Dropdown >
              <Menu.Item onClick={handleLogout} c={"red"} bg={"red.2"} leftSection={<i className="fa-solid fa-right-from-bracket"></i>}>
                Log Out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Stack>

      </Stack>
    </>
  )
}

export default Sidebar