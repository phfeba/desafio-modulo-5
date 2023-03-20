import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';
import DetailModal from '../components/DetailModal';
import ModalCharges from '../components/ModalCharges';
import ModalClients from '../components/ModalClients';
import ModalUser from '../components/ModalUser';

import Login from '../pages/Login';
import ClientsDetail from '../pages/MainApp/components/ClientsDetail';
import SignUp from '../pages/SignUp';
import MainApp from './../pages/MainApp/index';

import ProtectedRoutes from './ProtectedRoutes';

export default function OpenRoutes() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<Login />}
        />
        <Route
          path='/modal1'
          element={<ModalUser />}
        />
        <Route
          path='/modal2'
          element={<ModalClients />}
        />
        <Route
          path='/modal3'
          element={<ModalCharges />}
        />
        <Route
          path='/modal4'
          element={<DetailModal />}
        />
        <Route
          path='/modal5'
          element={<DeleteModal />}
        />
        <Route
          path='/clientsdetail'
          element={<ClientsDetail />}
        />
        <Route
          path='/signup'
          element={<SignUp />}
        />
        <Route element={<ProtectedRoutes />}>
          <Route
            path='/main'
            element={<MainApp />}
          />
          <Route
            path='/main/:rout/:id'
            element={<MainApp />}
          />
          <Route
            path='/main/:rout/'
            element={<MainApp />}
          />
        </Route>
      </Routes>
    </Router>
  );
}
