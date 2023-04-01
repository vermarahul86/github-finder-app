import { createContext, useReducer, useState, useEffect } from "react";
import githubReducer from "./GithubReducer";


const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user:{},
        repos: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

   

    const getUser = async(login) => {
        setLoading()
        const response = await fetch(`${GITHUB_URL}/users/${login}`,{
        headers:{
            Authorization: `token ${GITHUB_TOKEN}`
        }
    })

    console.log(response.status)
    if(response.status === 404){
        window.location = '/notfound'
    }else{
        const data = await response.json()
        dispatch({
            type: 'GET_USER',
            payload: data,
        })
    }
    }

    const getUserRepos = async(login) => {
        setLoading()
        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10
        })

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`,{
        headers:{
            Authorization: `token ${GITHUB_TOKEN}`
        }
    })
    const data = await response.json()
   
    dispatch({
        type: 'GET_REPOS',
        payload: data,
    })

    }

    const setLoading = () => {
        dispatch({
            type: 'SET_LOADING',
            })
    }

    const clearUsers = () => {
        dispatch({
            type: 'CLEAR_USERS',
            })
    }
    return <GithubContext.Provider value = {{
        //repos: state.repos, 
        //users: state.users, 
        //user:state.user, 
        ///loading: state.loading, instead pass the state directly as below.
        ...state,
        dispatch,
        getUser, 
        clearUsers, 
        getUserRepos}}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext