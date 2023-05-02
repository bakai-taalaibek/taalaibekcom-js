import { useSimpleDepositForm } from '../utilities/zustand'
import { useTranslation } from 'react-i18next'

const DepositCalculator = () => {
  const { 
    years, setYears,
    months, setMonths,
    interest, setInterest,
    initialDeposit, setInitialDeposit,
    capitalizationEnabled, setCapitalizationEnabled,
    capitalizationFrequency, setCapitalizationFrequency,
    interestEarned, setInterestEarned,
    finalValue, setFinalValue,
    calculated, setCalculated,
    effectiveRate, setEffectiveRate,
    monthlyTotal, setMonthlyTotal
  } = useSimpleDepositForm()
  
  const { t } = useTranslation()
  
  const handleCalculate = (event) => {
    event.preventDefault()  

    const yearsNumber = +event.target.years.value
    const monthsNumber = +event.target.months.value
    const interestNumber = +event.target.interest.value
    const initialDepositNumber = +event.target.initialDeposit.value

    if (!initialDepositNumber || !interestNumber || !(yearsNumber || monthsNumber)) {
      return alert(t('alertProvideNumbers'))
    }

    const totalMonths = yearsNumber * 12 + monthsNumber
    const monthsToCompound = capitalizationEnabled
                             ? 12 / capitalizationFrequency
                             : totalMonths
    const monthlyRate = interestNumber / 12 / 100

    let monthlyResult = []
    let monthZero = {
      'deposit': initialDepositNumber,
      'interest': 0,
      'capitalization': 0
    }
    monthlyResult.push(monthZero)

    for (let month = 1; month <= totalMonths; month++) {
      if (month % monthsToCompound === 0) {
        let currentInterest = monthlyResult[month - 1].deposit * monthlyRate
        let currentCapitalization = currentInterest * monthsToCompound
        let currentDeposit = monthlyResult[month - 1].deposit + currentCapitalization

        let currentMonth = {
          'deposit': currentDeposit,
          'interest': currentInterest,
          'capitalization': currentCapitalization
        }
        monthlyResult.push(currentMonth)
      } else {
        let currentInterest = monthlyResult[month - 1].deposit * monthlyRate
        let currentDeposit = monthlyResult[month - 1].deposit
        let currentMonth = {
          'deposit': currentDeposit,
          'interest': currentInterest,
          'capitalization': 0
        }
        monthlyResult.push(currentMonth)
      }
    }

    if (monthlyResult[totalMonths].deposit === monthlyResult[totalMonths - 1].deposit) {
      let currentInterest = monthlyResult[totalMonths - 1].deposit * monthlyRate
      let currentCapitalization = currentInterest * (totalMonths % monthsToCompound)
      let currentDeposit = monthlyResult[totalMonths - 1].deposit + currentCapitalization

      let currentMonth = {
        'deposit': currentDeposit,
        'interest': currentInterest,
        'capitalization': currentCapitalization
      }
      monthlyResult[totalMonths] = currentMonth
    }

    setFinalValue(monthlyResult[totalMonths].deposit)
    setInterestEarned(monthlyResult[totalMonths].deposit - initialDepositNumber)
    setEffectiveRate((monthlyResult[totalMonths].deposit / initialDepositNumber * 100 - 100) / (yearsNumber + monthsNumber / 12))
    setMonthlyTotal(monthlyResult)
    setCalculated(true)
  }

  const CalculationResult = () => {
    if (calculated) {
      return (
        <div className='[&>*]:my-2  mx-2 mt-6 mb-6'>
          <div><b>{ t('interestEarned') }:</b> { Math.round(interestEarned * 100) / 100 } </div>
          <div><b>{ t('finalValue') }:</b> { Math.round(finalValue * 100) / 100 }</div> 
          <div><b>{ t('effectiveRate') }:</b> { Math.round(effectiveRate * 100) / 100 }%</div>
          <div className='mx-3  shadow-md  '>
            <table className=' text-sm text-center text-slate-700 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 
                    dark:text-gray-400 [&>*>*]:px-3 [&>*>*]:py-3'>
              <tr>
                <th>{ t('month') }</th>
                <th>{ t('deposit') } </th>
                <th>{ t('interest') }</th>
                <th>{ t('capitalizationTable') }</th>
              </tr>
            </thead>
            <tbody >
              {monthlyTotal.map((month, number) => {
                return (
                  <tr key={number} className='g-white border-b dark:bg-gray-800 dark:border-gray-700
                                  hover:bg-gray-50 dark:hover:bg-gray-600 [&>*]:px-3 [&>*]:py-3'>
                    <td>{number}</td>
                    <td>{month.deposit.toFixed(2)}</td>
                    <td>{month.interest.toFixed(2)}</td>
                    <td>{month.capitalization.toFixed(2)}</td>
                  </tr>
                )
              })}
            </tbody>
            </table>
          </div>  
        </div>
      )
    }
  }

  const selectCompoundFrequency = `text-slate-800 rounded-lg border shadow-sm bg-white hover:bg-blue-50 
                                   focus:outline-none focus:border-blue-400 focus:ring-blue-800 
                                   focus:ring-opacity-75 text-sm dark:border-gray-600 
                                   dark:placeholder-gray-400 dark:focus:ring-blue-500 float-right w-32 
                                   h-[26px] pl-2 dark:bg-slate-800 dark:text-slate-100 
                                   dark:hover:bg-slate-700 dark:focus:border-slate-200`

  return (
    <div className='flex flex-wrap justify-center font-serif'>
      <div className='w-full max-w-4xl mt-5 px-6 text-justify first-letter:text-5xl 
            first-letter:float-left first-letter:mr-2 font-serif'>
        { t('welcomeDeposit') } 
      </div>
      <div className=' basis-2/5  mx-2 my-6  mb-2 font-medium text-slate-800 dark:text-white'>
        <form className=' w-80 px-2 ' onSubmit={handleCalculate}>
          <div className='my-4 text-left ' >
          { t('initialDeposit') } 
            <input
              className='st-input float-right dark:bg-slate-800 dark:text-slate-100 
                dark:hover:bg-slate-700 dark:focus:border-slate-200'
              type="number" 
              step='0.01'
              name="initialDeposit"
              value={ initialDeposit }
              onChange={(event) => setInitialDeposit(event.target.value) }
            />          
          </div>
          <div className='my-4 text-left'>
          { t('annualRate') }
            <input 
              className='st-input float-right dark:bg-slate-800 dark:text-slate-100 
              dark:hover:bg-slate-700 dark:focus:border-slate-200'
              type="number"    
              step='0.01'        
              name="interest"
              value={ interest }
              onChange={(event) => setInterest(event.target.value) }
            />
          </div>
          <div className=' text-left'>
            { t('capitalization') }
            <input 
              className=' ml-4  h-5 w-5 '
              type='checkbox' 
              name='capitalization'
              value={capitalizationEnabled}
              onChange={setCapitalizationEnabled}
            /> <br/>          
            { capitalizationEnabled && 
              <div className='my-4'>
                { t('compoundFrequency') }
                <select 
                  className={selectCompoundFrequency} 
                  value={capitalizationFrequency} onChange={({target}) => setCapitalizationFrequency(+target.value)}>
                  <option value='12'>{ t('monthly') }</option>
                  <option value='4'>{ t('quarterly') }</option>
                  <option value='2'>{ t('semiannually') }</option>
                  <option value='1'>{ t('annually') }</option>

                </select>
              </div>
            } 

          </div>
          <div className=' text-left my-4'> 
            { t('duration') }:
            <div className=' my-4'>              
              <input 
                className='st-input w-20 dark:bg-slate-800 dark:text-slate-100 
                dark:hover:bg-slate-700 dark:focus:border-slate-200'
                type="number"      
                name="years"
                value={years}
                onChange={(event) => setYears(event.target.value) }
              />
              <span className='ml-2'>{ t('yearsAnd') } </span>          
              <input 
                className='st-input w-20 dark:bg-slate-800 dark:text-slate-100 
                dark:hover:bg-slate-700 dark:focus:border-slate-200'
                type="number"       
                name="months"
                value={months}
                onChange={(event) => setMonths(event.target.value) }
              />
               <span className='ml-2'>{ t('months') }</span>
            </div>
          </div>
          
          <button className='st-button float-left dark:bg-sky-900 dark:text-slate-100 
                dark:hover:bg-sky-800 bg- dark:focus:border-sky-700 dark:border-sky-800' 
                type="submit">{t('calculate')}</button>
        </form>
      </div>
      
      <div className=' basis-2/5'>
        <CalculationResult />
      </div>
    </div>
  )  
}

export default DepositCalculator