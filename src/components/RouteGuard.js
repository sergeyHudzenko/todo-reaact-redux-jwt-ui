import React from 'react';
import { Navigate } from 'react-router-dom';
import hasJWT from '../utils/checkJwt';
 
const RouteGuard = ({ jwtRequired, navigateTo, children }) => {
   let component = <></>

   if (jwtRequired) {
     if (hasJWT()) {
        component = <>{children}</>
     } else {
        component = <Navigate to={navigateTo} />
     }
   } else {
        component = <>{children}</>
   }
   return (
    <>
    {
        component
    }
        
    </>
   );
};
 
export default RouteGuard;