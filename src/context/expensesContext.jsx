import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import ExpensesReducer from "./expensesReducer";

const ExpensesList_URL = 'http://localhost:5000/expenseslist';
const CategoriesList_URL = 'http://localhost:5000/categories';

export const ExpensesContext = createContext();

const initialState = {
    allExpenses: null,
    allCategory: null,
    monthlyExpenses: null,
}

export const ExpensesProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ExpensesReducer, initialState)

    const getExpensesData = async () => {
        try {
            const expensesList = await axios.get(ExpensesList_URL)
                .then(res => res.data)
            dispatch({
                type: "get_expensesList",
                payload: expensesList
            })
        } catch (error) {
            console.log(error);
        }
    }
    const getCategoriesData = async () => {
        try {
            const categoriesList = await axios.get(CategoriesList_URL)
                .then(res => res.data)
            dispatch({
                type: "get_categoriesList",
                payload: categoriesList
            })
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getExpensesData();
        getCategoriesData()
    }, [])

    const addExpenses = async (data) => {
        try{
            const localArr = state.allExpenses
            const newExpenses = await axios.post(ExpensesList_URL, data)
                .then(res => res.data)
    
            localArr.push(newExpenses)
                    
            dispatch({
                type: "addExpenses",
                payload: localArr
            })
        }catch(e){
            console.log(error);
            
        }  
    }

    const addCategories = async(data) =>{
           try {
            const localArr = state.allCategory
            const newCategories = await axios.post(CategoriesList_URL,data)
                .then(res => res.data)                                
            localArr.push(newCategories);
            dispatch({
                type:'addCategories',
                payload:localArr
            }) 
           } catch (error) {
            console.log(error);
            
           }           
    }

    const value = {
        allExpenses: state.allExpenses,
        allCategory: state.allCategory,
        addExpenses,
        getExpensesData,
        addCategories
    }

    return <ExpensesContext.Provider value={value}>
        {children}
    </ExpensesContext.Provider>
}