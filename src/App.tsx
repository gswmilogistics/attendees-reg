import { BrowserRouter, Route, Routes } from "react-router-dom";
import EventLanding from "./pages/EventLanding";
import RegisterPayment from "./pages/RegisterPayment";
import PleaseWait from "./pages/PleaseWait";
import Registered from "./pages/Registered";


function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventLanding />} />
        <Route path="/register" element={<RegisterPayment />} />
        <Route path="/wait" element={<PleaseWait />} />
        <Route path="/registered" element={<Registered />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
