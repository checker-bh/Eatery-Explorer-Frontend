import { Link } from 'react-router-dom';

const NavBar = ({ user, handleSignout }) => {

  //console.log("thia ia user",user)
  return (
    <>
      {user ? (
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to='/restaurants'>View all Restaurants</Link></li>
            <li><Link onClick={handleSignout} to="">Sign Out</Link></li>
            <li><Link to={`restaurants/owner/${user.id}`}>View My Restaurants</Link></li>
            <li><Link to="/restaurants/new">New Restaurant</Link></li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default NavBar;
