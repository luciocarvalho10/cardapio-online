import CategoryManager from './components/categoryManager';
import HeaderAdminPage from './components/headerAdminPage';
import ProductForm from './components/productForm';
import ProductTable from './components/productTable';
import ProtectedRoute from './components/protectedRoute';
import Stats from './components/stats';
import Tabs from './components/tabs';
import Toolbar from './components/toolbar';
import UserManager from './components/userManager';
import Dashboard from './pages/dashboard';
import Login from './pages/login';

const Admin = {
  CategoryManager,
  Dashboard,
  HeaderAdminPage,
  Login,
  ProductForm,
  ProductTable,
  ProtectedRoute,
  Stats,
  Tabs,
  Toolbar,
  UserManager,
};

export default Admin;