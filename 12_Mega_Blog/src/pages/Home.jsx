import {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full p-2">
                            <h1 className="mb-6 text-3xl font-bold text-gray-700 hover:text-gray-900">
                                Please login to see the posts.
                            </h1>
                            {/* Optional: Add a login button here if desired */}
                            {/* <Link to="/login">
                                <Button bgColor="bg-blue-500" textColor="text-white">Login</Button>
                            </Link> */}
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap -m-2'> {/* Added negative margin to counteract padding on children */}
                    {posts.map((post) => (
                        <div key={post.$id} className='w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/4'> {/* Responsive grid */}
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home