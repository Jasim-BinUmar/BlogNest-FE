import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ id, title, image, description, category, outerStyles, isOwner }) => {
    const navigate = useNavigate();

    //This submit is used to navigate to the blog view page or the edit blog page depending on the isOwner value
    const submit=()=>{
      
      if(isOwner){
        localStorage.setItem('blogId', id);
        console.log(localStorage.getItem('blogId'));
        navigate(`/editblog/${localStorage.getItem('blogId')}`);
      }
      else{
        navigate(`/blogs/${id}`)
      }
    }
  return (
    <div
      onClick={submit}
      className={`border-2 border-orange bg-blue text-yellow m-2 p-2 rounded-2xl 
        flex flex-col items-start ${outerStyles} 
        w-full sm:w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer hover:shadow-lg transition-shadow duration-300
        drop-shadow-2xl`}
      style={{ height: '350px', maxHeight: '350px' }}
    >
      <div className=" w-full h-40 mb-3">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-40 object-cover rounded-md mb-3"
          />
        ) : null}
        
      </div>
      <div className="flex justify-between items-center w-full mb-2">
        <h2 className="text-xl font-bold text-start">{title}</h2>
        <span className="text-xs font-semibold bg-yellow text-blue px-2 py-1 rounded-full">
          {category}
        </span>
      </div>
      
      <p className="text-sm overflow-hidden text-start text-primary" style={{ maxHeight: '80px' }}>
        {description}
      </p>
    </div>
  )
}

export default BlogCard