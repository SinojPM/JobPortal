import {  Flex,Title,Burger,Drawer } from "@mantine/core"
import "./Navbar.css"
import { useDisclosure } from "@mantine/hooks"
import Sidebar from "../sidebar/Sidebar"
import { useLocation } from "react-router-dom"
import { jobSeekerPages } from "../../../utils/constants"
import { useEffect, useRef } from "react"
import { useAppSelector } from "../../../redux/ReduxHooks"


const Navbar = () => {
  const [opened,{toggle,close}] = useDisclosure()
  const {pathname} = useLocation()
  const {pagination:{currentPage},apiResponse:{dummyAlljobs}}=useAppSelector(state=>state.jobReducer)
  const {pagination:{currentPage:activePage},apiResponse:{dummyAllCompanies}} = useAppSelector(state=>state.companyReducer)
  const currentPath = jobSeekerPages.find(item=>item.pathname===pathname)
  useEffect(()=>{
      scrollToTop()
    },[dummyAllCompanies,dummyAlljobs,currentPage,activePage])
     const topRef = useRef<HTMLDivElement | null>(null) 
    const scrollToTop = ()=>{
      topRef.current?.scrollIntoView({behavior:"smooth"})
    }
  
  
  return (
    <>
      <Flex ref={topRef}  w={"100%"} h={90} justify={"flex-start"} align={"center"} px={"md"}  className="Nav-container">
        <Burger opened={opened} onClick={toggle} hiddenFrom="md" color={"neutral.5"}/>
        <Title fw={"bold"} c={"neutral.5"}  order={2}>{currentPath?.page}</Title>
      </Flex>
      <Drawer p={0} size={"300"} opened={opened} onClose={close}>
        <Sidebar opened={opened}/>
      </Drawer>
    </>
  )
}

export default Navbar