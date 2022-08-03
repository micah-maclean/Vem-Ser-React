import { Container } from "../container/Container"
import { Spinner } from "./Loading.styled";

function Loading() {
  return (
    <Container width={'calc(100% - 255px)'} alignItems={'center'}>
      <Spinner>
        <div className="roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Spinner>
    </Container>
    
  )
};
export default Loading;