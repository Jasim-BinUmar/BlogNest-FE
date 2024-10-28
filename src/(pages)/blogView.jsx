import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import CommentCard from '../components/CommentCard';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

const BlogView = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [blogId, setBlogId] = useState(null);
    const [author, setAuthor] = useState('');
    const [imageSrc, setImageSrc] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/blogs/${localStorage.getItem('blogId')}`);
                setBlogId(localStorage.getItem('blogId'));
                setTitle(response.data.title);
                setDescription(response.data.content);
                setAuthor(response.data.author.username);
                if (response.data.image && response.data.image.data) {
                    const base64Image = `data:${response.data.image.contentType};base64,${response.data.image.data}`;
                    setImageSrc(base64Image);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/blogs/${localStorage.getItem('blogId')}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchBlogs();
        fetchComments();
    }, [id]);

    const postComment = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                `http://localhost:5000/api/blogs/${blogId}/comments`,
                { content: newComment },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const editComment = async (commentId, updatedContent) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(
                `http://localhost:5000/api/blogs/${localStorage.getItem('blogId')}/comments/${commentId}`,
                { content: updatedContent },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setComments(comments.map(comment => comment._id === commentId ? response.data : comment));
        } catch (error) {
            console.error('Error editing comment:', error);
        }
    };

    const deleteComment = async (commentId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/api/blogs/${localStorage.getItem('blogId')}/comments/${commentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setComments(comments.filter(comment => comment._id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div className='bg-blue min-h-screen'>
            <NavBar fixed={true} currentPage='blogsPage'/>
            <div className='flex flex-col sm:flex-row items-start justify-center'>
                <div className='flex flex-col items-start justify-start'>
                    <h1 className='text-yellow text-3xl font-bold mt-5 mr-5 ml-5 mb-2'>{title || "Title not found"}</h1>
                    <span className="text-xs font-semibold bg-lightBlue text-blue px-2 py-1 rounded-lg ml-5 shadow-md shadow-lightBlue">
                        {author || "Author not found"}
                    </span>
                    <img src={imageSrc} alt='blog' className='object-cover w-[350px] h-[300px] sm:w-[850px] sm:h-[500px] overflow-y-auto overflow-x-auto rounded-2xl mb-2 shadow-lg shadow-orange'/>
                    <p className='text-primary text-l sm:text-xl p-3 font-semibold w-[350px] sm:w-[850px] overflow-y-auto overflow-x-auto text-justify'>
                        {description || "Description not found"}
                    </p>
                </div>
                
                <div className='flex flex-col m-5 h-[600px] w-[350px] sm:h-[800px] sm:w-[350px] bg-blue border-2 border-yellow rounded-2xl shadow-lg shadow-orange p-5'>
                    <h1 className='text-yellow text-2xl font-bold mb-5 text-center'>Comments</h1>
                    
                    <div className='overflow-auto min-h-80 border-2 border-yellow rounded-2xl mb-2'>
                        {comments.map(comment => (
                            <CommentCard
                                key={comment._id}
                                user={comment.author.username || "Author not found"}
                                comment={comment.content || "No comments yet"}
                                isLoggedInUser={comment.author._id === localStorage.getItem('authorId')}
                                onEdit={(updatedContent) => editComment(comment._id, updatedContent)}
                                onDelete={() => deleteComment(comment._id)}
                            />
                        ))}
                    </div>

                    <FormField title="Comment" placeholder="Write your comment here..." handleChangeText={setNewComment} value={newComment} />
                    <CustomButton title='Post' handlePress={postComment} isLoading={false} containerStyles='mt-5 px-4 h-10 w-28 flex-1 justify-center items-center rounded-2xl'/>
                </div>
            </div>
        </div>
    );
};

export default BlogView;
