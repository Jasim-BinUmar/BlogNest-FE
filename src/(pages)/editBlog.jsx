import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import DialogOne from '../components/DialogOne';
import axios from 'axios';

const EditBlog = () => {
    const [processedBlog, setProcessedBlog] = useState(null);
    const [setBlogId, setSetBlogId] = useState(null);
    const { blogId } = useParams();
    const [Error, setError] = useState('');
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`https://blog-nest-be.vercel.app/api/blogs/${localStorage.getItem('blogId')}`)
                setProcessedBlog(response.data);
                console.log(processedBlog);
                if (blogId !== '0') {
                    setSetBlogId(localStorage.getItem('blogId'));
                    console.log(response.data.title);
                    setTitle(response.data.title);
                    setDescription(response.data.content);
                }

            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlogs();
    }, [blogId]);

    const blog = processedBlog;
    const [title, setTitle] = useState(blog ? blog.title : '');
    const [description, setDescription] = useState(blog ? blog.content : '');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file); // Store the file for upload
        }
    };

    const handlePress = async () => {
        setError('');
        if (localStorage.getItem('blogId') === null) {
            console.log("status of blogId is : "+localStorage.getItem('blogId') )
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', description);
            formData.append('category', 'Technology');
            if (selectedImage) {
                formData.append('image', selectedImage); // Append the image file
            }
            console.log(localStorage.getItem('token'));
            try {
                const response = await fetch('https://blog-nest-be.vercel.app/api/blogs', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Correctly include the token in the headers
                        // If you want to include other headers, add them here
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Blog Added successfully:', data);
                // Optionally navigate or show a success message
            } catch (error) {
                console.error('Error Adding blog:', error);
            }
        }
        else {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', description);
            formData.append('category', 'Technology');
            
            if (selectedImage) {
                formData.append('image', selectedImage);
            }

            try {
                const response = await fetch(`https://blog-nest-be.vercel.app/api/blogs/${localStorage.getItem('blogId')}`, {
                    method: 'PUT',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });

                // Check if the response is ok (status code 200-299)
                if (!response.ok) {
                    const errorData = await response.json(); // Get error response body
                    console.error(`Response status: ${response.status}`, errorData);
                    throw new Error('Network response was not ok');
                }
                
                localStorage.removeItem('blogId');
                // If successful, parse the response JSON
                const data = await response.json();
                console.log('Blog updated successfully:', data);
                setError('Blog updated successfully');
                // Proceed with success actions, like showing a message or redirecting
            } catch (error) {
                console.error('Error updating blog:', error);
                setError(error.message);
            }
        };
    };

    return (
        <div className='bg-blue h-full '>
            <NavBar currentPage='editblog' />
            <div className='flex flex-col justify-center items-center'>
                <div className='flex flex-col flex-auto sm:w-[650px] sm:h-full border-2 border-orange rounded-3xl mt-5 mb-6'>
                    <h1 className='text-yellow text-3xl font-bold mt-3 mb-2 text-center'>Edit Blog</h1>

                    <div>
                        <FormField
                            title='Title'
                            value={title}
                            placeholder='Enter blog title'
                            handleChangeText={(text) => setTitle(text)}
                            otherStyles='mt-5 px-4'
                        />
                    </div>
                    <div>
                        <FormField
                            title='Description'
                            value={description}
                            placeholder='Enter blog description'
                            handleChangeText={(text) => setDescription(text)}
                            otherStyles='mt-5 px-4'
                            inputDivStyles="h-[200px] overflow-y-auto"
                            inputStyles="h-[200px]"
                        />
                    </div>

                    {/**/}
                    <div className='sm:flex sm:flex-col sm:justify-start sm:items-start sm:gap-4 '>
                        {/* Image Upload div below */}
                        <div className='mt-5 px-4'>
                            <label htmlFor="image-upload" className='text-yellow font-semibold mb-2 block'>Upload Image</label>
                            <div className='flex items-center'>
                                <input
                                    type="file"
                                    id="image-upload"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className='hidden'
                                />
                                <label
                                    htmlFor="image-upload"
                                    className='bg-yellow text-blue font-semibold py-2 px-4 rounded-lg cursor-pointer hover:bg-opacity-80 transition-colors'
                                >
                                    Choose Image
                                </label>
                                {selectedImage && (
                                    <span className='ml-4 text-yellow'>Image selected</span>
                                )}
                            </div>
                            {selectedImage && (
                                <img src={URL.createObjectURL(selectedImage)} alt="Selected" className='mt-4 max-w-xs rounded-lg object-contain' />
                            )}
                        </div>
                    

                        <div className='flex flex-row gap-4 justify-center items-center '>
                            <CustomButton
                                title='Update Blog'
                                handlePress={handlePress} // Call the handlePress function here
                                isLoading={false}
                                containerStyles='m-5 px-4 h-12 w-22 flex-1 justify-center items-center rounded-lg'
                            />
                            <CustomButton title='Delete Blog' handlePress={() => { }} isLoading={false} containerStyles='m-5 px-4 h-12 w-22 flex-1 justify-center items-center rounded-lg bg-red-500' />
                        </div>
                    </div>
                </div>
            </div>
            {/* Show DialogOne if there's an error */}
            {Error && (
                <DialogOne
                    title="Response"
                    message={Error}
                    buttonTitle='OK'
                    onClose={() => setError('')} // Clear the error when the dialog is closed
                />
            )}
        </div>
    );
}

export default EditBlog;
