import graphql_logo from "../assets/graphql_logo.png";

const Header = () => {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          <div className='d-flex'>
            <img src={graphql_logo} alt='GraphQL Logo' />
            <span>MERN app with GraphQL</span>
          </div>
        </a>
      </div>
    </nav>
  );
};

export default Header;
