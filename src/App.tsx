import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth/Auth.tsx'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import PublicRoutes from './components/routing/PublicRoutes.tsx';
import Home from './pages/home/Home.tsx';
import PrivateRoutes from './components/routing/PrivateRoutes.tsx';
import UnAuthorized from './pages/UnAuthorized.tsx/UnAuthorized.tsx';
import JobSeekerHome from './pages/JobSeekerHome.tsx/JobSeekerHome.tsx';
import { routeDetails } from './utils/interfaces.ts';


const routes:routeDetails[] = [
  {path:"/login",component:<Auth/>,allowedUsers:"public"},
  {path:"/home",component:<Home/>,allowedUsers:"employer"},
  {path:"/jobs",component:<JobSeekerHome/>,allowedUsers:"job seeker"},
  {path:"/unauthorized",component:<UnAuthorized/>,allowedUsers:"all"},
  {path:"/",component:<Navigate to={"/login"}/>,allowedUsers:"public"}
]


function App() {
  return (
    <>
      <Routes>

        {/* public routes  */}
        
        <Route element={<PublicRoutes />}>
        {
            routes.filter(item=>item.allowedUsers==="public").map((item,index)=>(
              <Route key={`public${index}`} path={`${item.path}`} element={item.component} />
            ))
          }
        </Route>


    {/* private routes for employer */}


        <Route element={<PrivateRoutes role={"employer"} />}>
          {
            routes.filter(item=>item.allowedUsers==="employer").map((item,index)=>(
              <Route key={`employer${index}`} path={`${item.path}`} element={item.component} />
            ))
          }
        </Route>

      {/* private route for job seeker */}
       
        <Route element={<PrivateRoutes role={"job seeker"}/>}>
        {
            routes.filter(item=>item.allowedUsers==="job seeker").map((item,index)=>(
              <Route key={`seeker${index}`} path={`${item.path}`} element={item.component} />
            ))
          }
        </Route>


        {/* common routes */}
        {
            routes.filter(item=>item.allowedUsers==="all").map((item,index)=>(
              <Route key={`all${index}`} path={`${item.path}`} element={item.component} />
            ))
          }
      </Routes>
    </>
  )
}

export default App
