import React, { useState, useEffect } from 'react';
import './User.css';
import Footer from '../../components/Footer';
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import { updateReader } from '../../services/services';

// Define an interface for form data
interface FormData {
    id: number;
    address: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNumber: string;
    username: string;
    gender: string;
    image: string;
}

const User = () => {
    let navigate = useNavigate();

    // Sample user data (replace this with actual user data)
    const [user, setUser] = useState<FormData>({
        id: 0,
        address: "",
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
        username: "",
        gender: "",
        image: "",
    });

    useEffect(() => {
        const readerData = localStorage.getItem('ReaderData'); // Retrieve userData from local storage
        if (readerData) {
            const parsedReaderUserData = JSON.parse(readerData); // Parse the JSON string to object
            console.log(parsedReaderUserData);
            setUser(parsedReaderUserData); // Set the user state with the retrieved data
        }
    }, []);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    useEffect(() => {
        console.log(isModalVisible);
    }
    , [isModalVisible]);
    
    // State for form input fields
    const [selectedFile, setSelectedFile] = useState("");
    // Function to handle form submission (update user information)
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        // Prepare updated user 
        const updatedUser = {
            ...user,
            image: selectedFile // Use the selectedFile
        };
        // save to local storage
        localStorage.setItem('ReaderData', JSON.stringify(updatedUser));
        setUser(updatedUser);

        try {
            const updatedReader = await updateReader(updatedUser.id, updatedUser);
            console.log("Updated Reader",updatedReader);

            // Update user data in local storage
            // localStorage.setItem('ReaderData', JSON.stringify(updatedReader));

        } catch (error) {
            // Handle errors
          }


        setOpen(false);
      };

    // Function to handle logout
    const handleLogout = () => {
        // Perform logout actions, such as clearing session/local storage
        console.log("Logout clicked");
        navigate('/login');
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Input = styled('input')({
        display: 'none',
      });

    // const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             const dataURL = e.target?.result;
    //             setUser({
    //                 ...user,
    //                 image: dataURL as string
    //             });
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64String = reader.result as string;
              console.log(base64String.split(',')[1]);
              setSelectedFile(base64String.split(',')[1]);
            };
            reader.readAsDataURL(file);
        }
      };
      
    return (
        <div className='userProfile'>
            <Navbar/>
            <section>
                <div className="banner-Profile">
                    <div className='banner-text-Profile'>
                        <h2>find your book of choice</h2>
                        <br />
                        <p className='header-text-Profile fs-18 fw-3'>
                            Dive into our extensive collection of books and find the perfect read for every mood and moment.
                            <br />
                            Whether you're looking for thrilling adventures, heartwarming stories, or insightful knowledge,
                            we have something special just for you.
                        </p>
                    </div>
                </div>
            </section>  
            <div className="user-profile-container">
                <h1>User Profile</h1>
                <div className="user-info-section">
                    <div className="user-info">
                        <div className="user-avatar-section">
                            <p><strong>Avatar:</strong></p>
                            <Avatar
                                src={`data:image/jpeg;base64,${user.image}`}
                                onClick={toggleModal}
                                className="user-avatar"
                                aria-label="User avatar"
                            >
                                {!user.image && <i className="bx bxs-user"></i>}
                            </Avatar>
                        </div>
                        <p><strong>First Name:</strong> {user.firstName}</p>
                        <p><strong>Last Name:</strong> {user.lastName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Address:</strong> {user.address}</p>
                        <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Password:</strong> {user.password}</p>
                        <p><strong>Gender:</strong> {user.gender == 'M' ? "Male" : "Female"}</p>
                        {/* Add more user information as needed */}
                    </div>
                </div>
                <div className="button-section">
                    <Button variant="outlined" onClick={handleClickOpen} style={{ textTransform: 'none' }}>
                        Update
                    </Button>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <Footer/>
                {isModalVisible && (
                    <div className="modal" onClick={toggleModal}>
                        <span className="close">&times;</span>
                        <img className="modal-content" src={`data:image/jpeg;base64,${user.image}`} alt="User Avatar" />
                    </div>
                )}

            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update Form</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Please fill out the form below to update your information.
                </DialogContentText>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="firstname"
                            label="First Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={user.firstName}
                            onChange={(e) => setUser({...user, firstName: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                            margin="dense"
                            id="lastname"
                            label="Last Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={user.lastName}
                            onChange={(e) => setUser({...user, lastName: e.target.value})}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                        <TextField
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={user.password}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                        <TextField
                            margin="dense"
                            id="gender"
                            label="Gender"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={user.gender}
                            onChange={(e) => setUser({...user, gender: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={user.username}
                            onChange={(e) => setUser({...user, username: e.target.value})}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                        <TextField 
                            margin="dense"
                            id="address"
                            label="Address"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={user.address}
                            onChange={(e) => setUser({...user, address: e.target.value})}
                        />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            margin="dense"
                            id="phoneNumber"
                            label="Phone Number"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={user.phoneNumber}
                            onChange={(e) => setUser({...user, phoneNumber: e.target.value})}
                            />
                        </Grid>
                    </Grid>
                    
                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                        <Grid item xs={4}>
                                {user.image && <Avatar 
                            src={`data:image/jpeg;base64,${selectedFile ? selectedFile : user}`} 
                            sx={{ width: 100, height: 100 }} 
                        />}
                        </Grid>
                        <Grid item xs={8} container alignItems="center">
                                <label htmlFor="avatar">
                                    <Input id="avatar" type="file" onChange={handleAvatarChange} />
                                    <Button variant="outlined" component="span">
                                        Update Avatar
                                    </Button>
                                </label>

                        </Grid>
                    </Grid>

                </form>
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
            </Dialog>
        </div>
    );
};

export default User;
