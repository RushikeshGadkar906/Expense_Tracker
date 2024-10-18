
import React, { useContext, useEffect, useState } from 'react'
import { ExpensesContext } from '../context/expensesContext';

const ExpensesForm = () => {
  const [formData, setFromData] = useState( {
    "id": "",
    "date": "",
    "name": "",
    "category": "",
    "amount": ""
  });
  const [formError, setFromError] = useState({});
  const { allCategory, addExpenses } = useContext(ExpensesContext);


  const validation = () => {
    let errors = {};

    if (!formData.date) {
      errors.date = "Date is required"
    }
    if (!formData.name) {
      errors.name = "Name is required"
    }
    if (!formData.category) {
      errors.category = "Plz Select Category"
    }
    if (!formData.amount) {
      errors.amount = "Amount is required"
    }

    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validation();
    setFromError(validationErrors)
    
    if (Object.keys(validationErrors).length === 0) {
      addExpenses(formData)      
    }
    e.target.reset()
  }
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFromData({ ...formData, [name]: value })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row form_row">
          <div className="col-lg-2">
            {/* <label htmlFor=""><CalendarMonthIcon /></label> */}
            <input type="date" name='date' value={formData.date} onChange={(e) => handleInput(e)} className={`date form-control ${formError?.date ? "red" : ""}`} placeholder='Date' />
            <span className='red'>{formError?.date}</span>
          </div>
          <div className="col-lg-2">
            <input type="text" placeholder='Name' name='name' value={formData.name} onChange={(e) => handleInput(e)} className={`form-control ${formError?.name ? "red" : ""}`} />
            <span className='red'>{formError?.date}</span>
          </div>
          <div className="col-lg-2" >

            <div className={`form-control input ${formError?.date ? "red" : ""}`}>
              <select onChange={(e) => handleInput(e)} name='category'  className={`select_drop`}  >
                <option>Select Category</option>
                {
                  allCategory?.map((cat, i) => {
                    return (
                      <option key={i} value={cat.name}>{cat.name}</option>
                    )
                  })
                }

              </select>
            </div>
              <span className='red'>{formError?.date}</span>
          </div>
          <div className="col-lg-2">
            <input type="text" name='amount' value={formData.amount} onChange={(e) => handleInput(e)} className={`form-control ${formError?.amount ? "red" : ""}`} />
            <span className='red'>{formError?.date}</span>
          </div>
          <div className="col-lg-2">
            <button className='btn btn-success' >Add</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default ExpensesForm