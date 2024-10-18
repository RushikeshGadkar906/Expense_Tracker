import React, { useContext, useEffect, useState } from 'react'
import { ExpensesContext } from '../context/expensesContext'

const Categories = () => {
    const { allExpenses, addCategories } = useContext(ExpensesContext);
    const [formData, setFromData] = useState(null)
    const [withAmountCat, setWithAmountCat] = useState(null)

    // console.log(allExpenses);

    const handleAdd = (e) => {
        e.preventDefault();
        if (formData) {
            addCategories(formData)
            e.target.reset()
        }
    }

    const checkDup = (localArr) => {
        const result = {}
        localArr.forEach((item) => {
            const category = item.category;
            const amount = parseFloat(item.amount);
            if (result[category]) {
                result[category] += amount;
            } else {
                result[category] = amount;
            }
        })

        const rr = Object.keys(result).map(category => ({
            category: category,
            amount: result[category].toString() // Convert amount back to string
        }));

        // console.log(rr);
        setWithAmountCat(rr)
    }

    useEffect(() => {
        const localArr = [];

        const calculateTotalAmount = allExpenses?.map((item) => {
            localArr.push({ ["category"]: item.category, ["amount"]: item.amount })
            // console.log("hello");
            
            checkDup(localArr)
        })
        // setWithAmountCat(calculateTotalAmount)
        // console.log(calculateTotalAmount,"useEff");

    }, [allExpenses])

    return (
        <div>
            <div className='d-flex'>
                <h4>Categories</h4>
                {/* <!-- Button trigger modal --> */}
                <button type="button" className="btn btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    +
                </button>
            </div>

            <div>
                <ul className='mt-2'>
                    {
                        withAmountCat?.map((cat, i) => {
                            return (
                                <li key={i}><h6>{cat.category} - ({cat.amount})</h6></li>
                            )
                        })
                    }
                </ul>
            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Categories</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleAdd}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Categories</label>
                                    <input type="text" onChange={e => setFromData({ ...formData, name: e.target.value })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories