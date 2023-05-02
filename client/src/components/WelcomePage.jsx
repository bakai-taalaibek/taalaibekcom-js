import { useTranslation } from 'react-i18next';
import CS50img from '../assets/CS50xA4.png';
import FSOimg from '../assets/certificate-fullstack.png';

const WelcomePage = () => {
  const { t } = useTranslation()

  return (
    <div className='flex flex-wrap justify-center font-serif mb-5 '>
      <div className={ textArea }>
        { t('welcome') }
      </div>
      <div className={ textArea }>
        <div className={ imageArea }>
          <img  src={ CS50img } alt="CS50 Certificate" />
        </div>
        <p > { t('aboutCS50') }</p>
      </div>
      <div className={ textArea }>
        <div className={ imageArea }>
          <img  src={ FSOimg } alt="Full Stack Open Certificate" />
        </div>
        <p > { t('aboutFSO') }</p>
      </div>
    </div>
  )
}

export default WelcomePage

const textArea = `
  w-full max-w-4xl 
  mt-5 px-6 text-justify 
  first-letter:text-5xl first-letter:float-left first-letter:mr-2   `

const imageArea = `
  w-full sm:max-w-xs 
  float-none sm:float-right 
  sm:ml-4 sm:mr-1 mr-4 mb-2  `