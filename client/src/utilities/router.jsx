import { createBrowserRouter } from "react-router-dom";
import App from '../components/App'
import DepositCalculator from '../components/DepositCalculator'
import WelcomePage from '../components/WelcomePage'
import ErrorPage from "./error-page";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <WelcomePage/>,
      },
      {
        path: 'deposit-calculator',
        element: <DepositCalculator/>
      }
    ]
    
  },

])

