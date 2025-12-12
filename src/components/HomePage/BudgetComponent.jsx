import BudgetRow from "./BudgetRow";

const BudgetComponent = () => {
    return (
    <div className="w-full max-w-[1200px] mx-auto px-4 flex flex-col gap-10 mb-20">
      <h3 className="text-2xl font-semibold mb-2">
        Find the perfect gift within your budget
      </h3>
      <BudgetRow
            title=" Gifts under €20"
            minPrice={1}
            maxPrice={20}
            viewAllPath="/search?price=1-20"
        /> 

        <BudgetRow
            title="Gifts from €20 to €100"
            minPrice={20}
            maxPrice={100}
            viewAllPath="/search?price=20-100"
        />

        <BudgetRow
            title="Luxury gifts (€100+)"
            minPrice={100}
            viewAllPath="/search?price=100+"
        />   
    </div>
  );
}
export default BudgetComponent;
    