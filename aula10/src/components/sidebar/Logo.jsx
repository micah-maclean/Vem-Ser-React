import LogoIcon from "../../images/logo.png"
import { LogoLink } from "./Sidebar.styled"

function Logo() {
  return (
    <LogoLink to='/'>
        <img src={LogoIcon} alt="" />
        <h2>Daskboard Kit</h2>
    </LogoLink>
  )
}
export default Logo