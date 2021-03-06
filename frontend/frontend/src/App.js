import { Container } from "react-bootstrap"
import { BrowserRouter as Router,Route,Routes} from "react-router-dom"
import LoginScreen from "./screens/LoginScreen"
import OTPRegisterationScreen from "./screens/OTPRegisterationScreen"
import BranchesScreen from "./screens/BranchesScreen"
import SearchScreen from "./screens/SearchScreen"
import ReportScreen from "./screens/ReportScreen"
import HomeScreen from "./screens/HomeScreen"
import Header from "./components/Header"
import Footer from "./components/Footer"
import BranchHistory from "./screens/BranchHistory"


function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
        <Routes>
          <Route path='/' element={<LoginScreen/>} exact />
          <Route path='/home' element={<HomeScreen/>}  />
          <Route path="/branch/:code" element={<BranchHistory />} />
          <Route path='/addotp' element={<OTPRegisterationScreen/>}  />
          <Route path='/branches' element={<BranchesScreen/>}  />
          <Route path='/report' element={<ReportScreen/>}  />
          <Route path='/search' element={<SearchScreen/>}  />
        </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
