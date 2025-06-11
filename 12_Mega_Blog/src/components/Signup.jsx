import {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center py-8 bg-gradient-to-br from-gray-100 to-gray-200"> {/* Added page background gradient and padding */}
            <div className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 shadow-2xl border border-gray-200`}> {/* Changed card bg to white, added more shadow */}
            <div className="flex justify-center mb-4"> {/* Increased mb */}
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-3xl font-bold leading-tight text-center text-gray-800">Sign up to create account</h2> {/* Increased font size and changed color */}
                <p className="mt-2 text-base text-center text-gray-600"> {/* Changed color */}
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-purple-600 transition-all duration-200 hover:text-purple-800 hover:underline" // Changed link color
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="mt-8 text-center text-red-600">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name" // Changed label text
                        placeholder="Enter your full name"
                        className="focus:border-purple-500 focus:ring-purple-500" // Enhanced focus
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email Address" // Changed label text
                        placeholder="Enter your email"
                        type="email"
                        className="focus:border-purple-500 focus:ring-purple-500" // Enhanced focus
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password" // Changed label text
                        type="password"
                        placeholder="Enter your password"
                        className="focus:border-purple-500 focus:ring-purple-500" // Enhanced focus
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup