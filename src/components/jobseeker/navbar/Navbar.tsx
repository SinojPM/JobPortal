import {  Flex,Title,Burger,Drawer } from "@mantine/core"
import "./Navbar.css"
import { useDisclosure } from "@mantine/hooks"
import Sidebar from "../sidebar/Sidebar"


const Navbar = () => {
  const [opened,{toggle,close}] = useDisclosure()
  return (
    <>
      <Flex  w={"100%"} h={90} justify={"flex-start"} align={"center"} px={"md"}  className="Nav-container">
        <Burger opened={opened} onClick={toggle} hiddenFrom="md" color={"neutral.5"}/>
        <Title fw={"bold"} c={"neutral.5"}  order={2}>Find Jobs</Title>
      </Flex>
      <Drawer p={0} size={"300"} opened={opened} onClose={close}>
        <Sidebar opened={opened}/>
      </Drawer>
    </>
  )
}

export default Navbar