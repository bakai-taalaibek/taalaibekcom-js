import { useTheme } from '../utilities/zustand'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const App = () => {
  const { darkThemeBool } = useTheme()
  
  return (
    <div className={darkThemeBool ? 'dark' : ''} >
      <Header />
      <div className={ body }>
        <div className={ contentArea }>
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default App;

const body = `
  h-max min-h-screen
  flex justify-center
  bg-slate-500 dark:bg-slate-700  `

const contentArea = `
  w-full max-w-screen-lg
  bg-white dark:bg-slate-900 
  text-center dark:text-slate-200 
  pt-5 `