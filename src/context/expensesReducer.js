const ExpensesReducer = (state, action) => {
    switch (action.type) {
        case "get_expensesList":
            // console.log(action.payload);
            return {
                ...state,
                allExpenses: action.payload
            }

        case "get_categoriesList":
            console.log(action.payload);
            return {
                ...state,
                allCategory: action.payload
            }

        case "addExpenses":
            return {
                ...state,
                allExpenses: action.payload
                    // allExpenses:[...state.allExpenses, action.payload]     
            }

        case "addCategories":
            return {
                ...state,
                allallCategory: action.payload
            }

        default:
            throw Error("not matching")

    }
}

export default ExpensesReducer