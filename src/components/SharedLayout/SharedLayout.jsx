import { Outlet } from 'react-router-dom';
// import css from 'components/SharedLayout/SharedLayout.module.css';
import {
  Container,
  Header,
  Link,
} from 'components/SharedLayout/SharedLayout.styled';

const SharedLayout = () => {
  return (
    <Container>
      <Header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
        </nav>
      </Header>
      <Outlet />
    </Container>
  );
};

export default SharedLayout;
