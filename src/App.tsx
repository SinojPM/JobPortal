import { Routes, Route } from 'react-router-dom'
import './App.css'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import PublicRoutes from './components/routing/PublicRoutes.tsx';
import PrivateRoutes from './components/routing/PrivateRoutes.tsx';
import { routes } from './utils/pathConstants.tsx';
import { allowedUsers } from './utils/constants.ts';


function App() {
  return (
    <>
      <Routes>

        {/* public routes  */}

        <Route element={<PublicRoutes />}>
        {
            routes.filter(item=>item.allowedUsers===allowedUsers.public).map((item,index)=>(
              <Route key={`public${index}`} path={`${item.path}`} element={item.component} />
            ))
          }
        </Route>


    {/* private routes for employer */}


        <Route element={<PrivateRoutes role={"employer"} />}>
          {
            routes.filter(item=>item.allowedUsers===allowedUsers.employer).map((item,index)=>(
              <Route key={`employer${index}`} path={`${item.path}`} element={item.component} />
            ))
          }
        </Route>

      {/* private route for job seeker */}
       
        <Route element={<PrivateRoutes role={"jobSeeker"}/>}>
        {
            routes.filter(item=>item.allowedUsers===allowedUsers.jobSeeker).map((item,index)=>(
              <Route key={`seeker${index}`} path={`${item.path}`} element={item.component} />
            ))
          }
        </Route>


        {/* common routes */}
        {
            routes.filter(item=>item.allowedUsers===allowedUsers.all).map((item,index)=>(
              <Route key={`all${index}`} path={`${item.path}`} element={item.component} />
            ))
          }
      </Routes>
    </>
  )
}

export default App
