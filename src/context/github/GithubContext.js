import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";


const GithubContext = createContext()


export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user:{},
        repos: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    return <GithubContext.Provider value = {{
        //repos: state.repos, 
        //users: state.users, 
        //user:state.user, 
        ///loading: state.loading, instead pass the state directly as below.
        ...state,
        dispatch,
        
        }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext