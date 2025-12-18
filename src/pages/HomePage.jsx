import UnwrapzaAI from '../components/UnwrapzaAI/UnwrapzaAI';
import TrendingProducts from '../components/products/TrendingProducts'
import Categories from '../components/HomePage/Categories';
import BudgetComponent from '../components/HomePage/BudgetComponent';
import RecentlyViewed from '../components/HomePage/RecentlyViewed';
import WhyUnwrapza from '../components/HomePage/WhyUnwrapza';
const HomePage = () => {

    return(
        <div>
            <UnwrapzaAI/>
            <TrendingProducts/>
            <Categories/>
            <BudgetComponent/>
            <WhyUnwrapza/>
            <RecentlyViewed/>
        </div>
    )
}

export default HomePage;