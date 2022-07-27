import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import {useNavigate} from "react-router-dom"

function People() {
  const navigate = useNavigate();
  const {token} = useContext(AuthContext);

  useEffect(() => {
    !token && navigate('/')
  }, []);

  return (
    <div>Pessoas</div>
  )
}
export default People