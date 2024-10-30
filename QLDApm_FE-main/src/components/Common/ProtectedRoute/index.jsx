// import { jwtDecode } from 'jwt-decode'
// import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
  // const token = localStorage.getItem('accessToken')
  // const decoded = jwtDecode(token)
  // const role = 'admin'
  // if (!allowedRoles.includes(role)) {
  //     return <Navigate to="/" replace />;
  // }

  return children
}

export default ProtectedRoute
