import React, { useEffect } from 'react'

const RecordTable = ({ records }) => {
   
    
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        {
                           records?.length > 0 ? Object.keys(records[0])?.filter(key => key !== 'id')?.map((record,i)=>{
                            return <th key={i} scope="col">{record}</th> 
                           })                           
                           : []
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        records?.map((r, i) => {
                            return (
                                <tr key={i}>
                                    <td>{r.date}</td>
                                    <td>{r.name}</td>
                                    <td>{r.category}</td>
                                    <td>{r.amount}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={4} className='text-end pe-5 '>
                            <span className='pe-5 me-5'>Total = {
                                records?.map(item => parseInt(item.amount)).reduce((a,b)=> a+b ,0).toLocaleString()
                            }</span>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default RecordTable