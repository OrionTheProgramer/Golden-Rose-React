import React, { useEffect } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Blog() {
    useEffect(() => {
      document.title = "Blogs | Golden Rose";
    }, []);  
  return (
    <>
    <div>Blog</div> 
    </>

  )
}


export default Blog