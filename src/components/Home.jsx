import React, { useContext, useEffect, useState } from 'react'
import ExpensesForm from './ExpensesForm'
import RecordTable from './RecordTable'
import { ExpensesContext } from '../context/expensesContext'
import Categories from './Categories'

const Home = () => {
  const { allExpenses } = useContext(ExpensesContext)
 

  return (
    <div className='container-fluid'>
      <div className="row mt-4">
        <div className="col-lg-2">
          <Categories />

        </div>
        <div className="col-lg-10">
          <div >
            <h4 className='pb-1'>Add Expenses Here</h4>
            <ExpensesForm />
          </div>
          <div className='mt-4'>
            <h4>History</h4>
            {
              allExpenses?.length !== 0 ? <RecordTable records={allExpenses} /> : <h6>Sorry No Data</h6>
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home