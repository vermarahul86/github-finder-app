import { useEffect, useContext } from "react"
import GithubContext from "../context/github/GithubContext"
import { useParams } from "react-router-dom"
import UserItem from "../components/users/UserItem"


function User() {

    const {getUser, user} = useContext(GithubContext)

    const params = useParams()

    useEffect(() => {
       getUser(params.login) 
    }, [])

  return (
    <div>
        <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
                <UserItem key={user.id} user={user}/>
        </div>
    </div>
  )
}

export default User
