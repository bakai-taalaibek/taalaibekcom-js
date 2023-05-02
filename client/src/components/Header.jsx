import { useTranslation } from 'react-i18next'
import themeIcon from '../assets/brightness.png'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../utilities/zustand'

const Header = () => {
  const { darkThemeBool, setDarkThemeBool } = useTheme()
  const { t, i18n } = useTranslation()
  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value)
  }

  // styles are below the main component
  return (
    <header className={ headerStyle }>
      <div className=' w-full  max-w-screen-lg flex md:justify-center justify-between'>
        <div className={ headerLeftBig }>
          <NavLink 
            to=""
            className={ ({ isActive }) => isActive ? activeNavButton : passiveNavButton } >
            { t('main') }
          </NavLink>
          <NavLink 
            to="deposit-calculator"
            className={ ({ isActive }) => isActive ? activeNavButton : passiveNavButton } >
            { t('depositCalculator') }
          </NavLink>
          </div>
            <div className={ headerRightBig }>
              <button >
                <img 
                  className='w-6 h-6 mr-5' 
                  src={ themeIcon } alt='Theme Switcher' 
                  onClick={ () => setDarkThemeBool(!darkThemeBool) }
                />
              </button>
            <div role='group'>
            <button 
              className={`${i18n.language === 'en-US' ? activeLangButton : passiveLangButton}`}
              type='button' 
              value='en-US'
              onClick={changeLanguage}>en</button>
            <button 
              className={`${i18n.language === 'ru' ? activeLangButton : passiveLangButton}`}
              type='button' 
              value='ru' 
              onClick={changeLanguage}>ru</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

const headerStyle = `
  bg-white dark:bg-gray-900 p-4 
  border-b border-gray-200  dark:border-gray-500 
  flex justify-center`

const activeNavButton = `
  font-semibold
  bg-white dark:bg-gray-900  
  text-blue-900 dark:text-white 
  border-l border-t border-r rounded-t border-transparent dark:border-gray-900
  py-2 px-4 `
const passiveNavButton = `
  font-semibold
  bg-white dark:bg-gray-900 
  text-blue-400 hover:text-blue-500 dark:text-gray-400 dark:hover:text-gray-300
  border-l border-t border-r rounded-t border-transparent dark:border-gray-900
  py-2 px-4 `

const activeLangButton = `
  font-semibold text-xs uppercase
  bg-slate-200 dark:bg-slate-600
  text-slate-700 dark:text-slate-100 leading-normal
  px-5 pb-2 pt-2.5  
  inline-block ease-in-out float-right `
const passiveLangButton = `
  font-semibold text-xs uppercase
  bg-slate-100 dark:bg-slate-500
  text-slate-700 dark:text-slate-100 leading-normal
  px-5 pb-2 pt-2.5  
  inline-block ease-in-out float-right `

const headerLeftBig = `justify-start self-center shrink lg:mr-14 w-96`
const headerRightBig = `float-right md:ml-52 items-center shrink flex justify-end md:w-52 mr-4`