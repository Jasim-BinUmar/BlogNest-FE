import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import DropdownMenu from '../components/DropDownMenu';
import BlogCard from '../components/BlogCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyBlogs = () => {
  const [blogData, setBlogData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3; // Limit to 3 blogs per page
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const authorId=localStorage.getItem('authorId');
      const response = await axios.get(`http://localhost:5000/api/blogs/user/${authorId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const processedBlogs = response.data.map(blog => ({
        id: blog._id,
        title: blog.title,
        description: blog.content,
        authorId: blog.author._id,
        authorName: blog.author.username,
        category: blog.category[0],
        image: blog.image && blog.image.data 
            ? `data:${blog.image.contentType};base64,${blog.image.data}` 
            : null
      }));

      setBlogData(processedBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const categories = ['All', ...new Set(blogData.map(blog => blog.category))];

  const menuItems = categories.map(category => ({
    name: category,
    handleClick: (category) => setSelectedCategory(category)
  }));

  const filteredBlogs = selectedCategory === 'All' 
    ? blogData 
    : blogData.filter(blog => blog.category === selectedCategory);

  // Calculate the current blogs to display
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Calculate total pages
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className='bg-primary min-h-screen'>
      <NavBar currentPage='myblogs' />

      <div className="flex flex-row items-center justify-between w-full mr-2 mt-5">
        <button 
          className="bg-blue text-yellow px-4 py-2 rounded-lg hover:border-2 hover:border-orange ml-2"
          onClick={() => { navigate('/createBlog') }}>
          Create Blog
        </button>
        
        <div className="ml-auto mr-2">
          <DropdownMenu menuItems={menuItems} selectedCategory={selectedCategory} />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center items-start bg-gradient-to-t from-yellow to-orange m-4 p-5 rounded-2xl border-blue border-2 drop-shadow-2xl">
        {currentBlogs.map((blog, index) => (
          <BlogCard
            isOwner={true}
            key={index}
            id={blog.id}
            title={blog.title}
            image={blog.image}
            description={blog.description}
            category={blog.category}
            authorName={blog.authorName}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="mx-2"
        >
          Previous
        </button>
        <span>{currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MyBlogs;
