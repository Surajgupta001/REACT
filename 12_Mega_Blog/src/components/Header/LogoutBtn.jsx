import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='px-6 py-2 text-white duration-200 rounded-full hover:bg-white hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn