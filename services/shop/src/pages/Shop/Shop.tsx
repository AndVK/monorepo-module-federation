import { Link } from 'react-router-dom';
import { shopRoutes } from '@packages/shared/src/routes/shop';

const Shop = () => {
  return (
    <>
      <h1>SHOP</h1>
      <div>
        <Link to={shopRoutes.second}>GO to second page</Link>
      </div>
    </>
  );
};

export default Shop;
