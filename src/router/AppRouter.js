import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Signin from '../components/Signin';
import Signout from '../components/Signout';
import Signup from '../components/Signup';
import TransactionDetails from '../components/TransactionDetails';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Signin />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/transaction' element={<TransactionDetails />}></Route>
                <Route path='/logout' element={<Signout />}></Route>
            </Routes>
        </Router>
    )
}

export default AppRouter;

