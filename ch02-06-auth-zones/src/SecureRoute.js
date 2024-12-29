import Login from './Login'
import { Route } from 'react-router-dom'
import useSecurity from './useSecurity'
// useSecurity is a function 
const SecureRoute = (props) => {
  const { loggedIn } = useSecurity()

  return (
    <Route {...props}>{loggedIn ? props.children : <Login />}</Route>
  )
}

export default SecureRoute
