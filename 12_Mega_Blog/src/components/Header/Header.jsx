import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className='py-3 text-white shadow bg-gradient-to-r from-blue-500 to-purple-600'>
      <Container>
        <nav className='flex items-center'> {/* Added items-center for vertical alignment */}
          <div className='mr-4'>
            <Link to='/'>
              {/* Assuming Logo component can handle white text or is an SVG that's visible on dark bg */}
              <Logo width='70px'   />
              </Link>
          </div>
          <ul className='flex items-center ml-auto space-x-2'> {/* Added items-center and space-x-2 */}
            {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='px-6 py-2 duration-200 rounded-full hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                {/* LogoutBtn might need styling adjustments for contrast if it's not already suitable */}
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header