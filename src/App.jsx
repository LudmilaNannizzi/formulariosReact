import { Container } from "@chakra-ui/react";
import FormLogIn from "./Components/FormLogIn";
import FormRegis from "./Components/FormRegis";

function App() {
  return (
    <div className="App">
      <Container>
        <FormLogIn />
        <FormRegis />
      </Container>
    </div>
  );
}

export default App;
