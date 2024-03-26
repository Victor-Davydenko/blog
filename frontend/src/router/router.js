import {createBrowserRouter} from 'react-router-dom';
import Layout from '../components/Layout';
import {routes} from './routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: routes
  }
])