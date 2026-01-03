import BudgetRow from "./BudgetRow";

const BudgetComponent = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 flex flex-col gap-16 mb-20 mt-10">
      {/* Header: Zelfde stijl als Product Titel */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
          Find the perfect gift <span className="text-[#44A77D]">within your budget</span>
        </h1>
        {/* Subtiel detail om het af te maken */}
        <div className="h-1 w-12 bg-[#44A77D] rounded-full"></div>
      </div>

      {/* Rijen: Met dezelfde spacing als de info-secties op de vorige pagina */}
      <div className="flex flex-col gap-12">
        <div className="pt-8 border-t border-gray-100">
          <BudgetRow
            title="Gifts under €20"
            minPrice={1}
            maxPrice={20}
            viewAllPath="/budget?min=0&max=20"
          />
        </div>

        <div className="pt-8 border-t border-gray-100">
          <BudgetRow
            title="Gifts from €20 to €100"
            minPrice={20}
            maxPrice={100}
            viewAllPath="/budget?min=20&max=100"
          />
        </div>

        <div className="pt-8 border-t border-gray-100">
          <BudgetRow
            title="Luxury gifts (€100+)"
            minPrice={100}
            maxPrice={10000}
            viewAllPath="/budget?min=100"
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetComponent;