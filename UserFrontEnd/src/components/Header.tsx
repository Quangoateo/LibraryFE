import Navbar from "./Navbar/Navbar";
import "./Header.css"

const Header = () => {
    return (
        <div className='holder'>
            <Navbar />
            <header className='banner'>
                <div className='banner-text'>
                    <h2>Discover Your Next Favorite Book</h2>
                    <br />
                    <p className='header-text fs-18 fw-3'>
                        Dive into our extensive collection of books and find the perfect read for every mood and moment. 
                        <br />
                        Whether you're looking for thrilling adventures, heartwarming stories, or insightful knowledge, 
                        we have something special just for you.
                    </p>
                </div>
            </header>
        </div>
    )
}

export default Header