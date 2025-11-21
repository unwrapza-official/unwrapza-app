import UnwrapzaAI from '../components/UnwrapzaAI/UnwrapzaAI';
import AllProducts from '../components/products/AllProducts';
import TrendingProducts from '../components/products/TrendingProducts'

const HomePage = () => {

    return(
        <div>
            <UnwrapzaAI/>
            <TrendingProducts/>
            <AllProducts/>
        </div>
    )
}

export default HomePage;