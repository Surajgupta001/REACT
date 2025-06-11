import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link
      to={`/post/${$id}`}
      className="block overflow-hidden transition-shadow duration-200 ease-in-out shadow-md rounded-xl hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
        <div className='w-full p-5 bg-gray-100'>
            <div className='justify-center w-full mb-4'>
                <img
                  src={appwriteService.getFilePreview(featuredImage)}
                  alt={title} // Alt text is good
                  className='object-cover w-full h-48 rounded-xl' // Added fixed height and object-cover
                />
            </div>
            <h2
            className='text-xl font-bold text-gray-800' // Slightly darker text for better contrast
            >{title}</h2>
        </div>
    </Link>
  )
}

PostCard.propTypes = {
    $id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    featuredImage: PropTypes.string.isRequired
};

export default PostCard