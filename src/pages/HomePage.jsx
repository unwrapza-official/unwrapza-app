import UnwrapzaAI from '../components/UnwrapzaAI/UnwrapzaAI';
import TrendingProducts from '../components/products/TrendingProducts'
import Categories from '../components/HomePage/Categories';
import BudgetComponent from '../components/HomePage/BudgetComponent';
const HomePage = () => {

    return(
        <div>
            <UnwrapzaAI/>
            <TrendingProducts/>
            <Categories/>
            <BudgetComponent/>

        </div>
    )
}

export default HomePage;