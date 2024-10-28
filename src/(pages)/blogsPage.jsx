import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import DropdownMenu from '../components/DropDownMenu';
import BlogCard from '../components/BlogCard';
import axios from 'axios';

const BlogsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [blogData, setBlogData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/blogs`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const processedBlogs = response.data.map(blog => ({
        id: blog._id,
        title: blog.title,
        description: blog.content,
        authorId: blog.author._id,
        authorName: blog.author.username,
        category: blog.category[0] || 'Uncategorized',
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
    handleClick: () => {
      setSelectedCategory(category);
      setCurrentPage(1); // Reset to page 1 when changing category
    }
  }));

  const filteredBlogs = selectedCategory === 'All'
    ? blogData
    : blogData.filter(blog => blog.category === selectedCategory);

  // Calculate paginated blogs
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className='bg-primary min-h-screen'>
      <NavBar currentPage='blogsPage' />

      <div className="flex justify-end items-center mr-2 mt-5">
        <DropdownMenu menuItems={menuItems} selectedCategory={selectedCategory} />
      </div>

      <div className="flex flex-wrap gap-4 justify-center items-start bg-gradient-to-t from-yellow to-orange m-4 p-5 rounded-2xl border-blue border-2 drop-shadow-2xl">
        {paginatedBlogs.map((blog, index) => (
          <BlogCard
            key={index}
            id={blog.id}
            title={blog.title}
            image={blog.image}
            description={blog.description}
            category={blog.category}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {filteredBlogs.length > itemsPerPage && (
        <div className="flex justify-center mt-4 space-x-2">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
