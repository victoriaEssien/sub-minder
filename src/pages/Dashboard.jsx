
import MoneyBagIcon from "../assets/icons/money-bag-icon.svg"
import SubCountIcon from "../assets/icons/sub-count-icon.svg"
import NetflixLogo from "../assets/icons/netflix-logo.svg"

function Dashboard() {
  return (
    <main className="bg-[#fafafa] h-full">
        <div className="mx-4 md:mx-12 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between w-full">
                <div>
                    <h1 className="font-montserrat text-3xl md:text-4xl font-bold text-[#2d2d2d] leading-normal md:leading-loose">My Dashboard</h1>
                    <p className="text-sm font-roboto text-[#808080] md:w-8/12 leading-relaxed">Overview of your payments</p>
                </div>

                <div className="'md:w-auto mt-8 md:mt-0 ms-auto md:ml-auto">
                    <button type="submit" className="bg-[#F5B400] text-[#2d2d2d] text-center font-roboto rounded-lg px-6 py-2.5 md:py-2.5 hover:bg-[#E3A000]">Add Subscription</button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-x-6 mt-12">
                {/* Total cost card */}
                <div className="flex flex-col bg-[#fff] p-6 rounded-lg w-full md:w-3/12">
                    <div className="flex flex-row items-center justify-between">
                    <h5 className="text-sm font-roboto text-[#808080]">Monthly Costs</h5>
                    <img src={MoneyBagIcon} alt="" />
                    </div>
                    <h1 className="text-[32px] font-roboto font-extrabold text-[#3E6B8E]">&#8358;7,400.00</h1>
                </div>
                
                {/* Total Subscriptions */}
                <div className="flex flex-col bg-[#fff] px-6 py-6 rounded-lg w-full md:w-3/12">
                    <div className="flex flex-row items-center justify-between">
                    <h5 className="text-sm font-roboto text-[#808080]">Total Subscriptions</h5>
                    <img src={SubCountIcon} alt="" />
                    </div>
                    <h1 className="text-[32px] font-roboto font-extrabold text-[#3E6B8E]">05</h1>
                </div>
            </div>

            <div className="mt-16">
                <h2 className="font-montserrat text-2xl font-bold text-[#2d2d2d] leading-normal md:leading-loose">Subscription Overview</h2>

                <div className="mt-10 bg-[#fff] p-6 rounded-lg">
                    {/* Subscription service list */}
                    <div className="flex flex-row gap-x-3 items-start py-4 border-b">
                        <div>
                            <img src={NetflixLogo} alt="netflix logo" />
                        </div>
                        <div className="w-full">
                            <div className="flex flex-row items-center justify-between">
                            <p className="font-roboto text-base text-[#808080]">Netflix</p>
                            <p className="font-roboto text-base text-[#808080]">&#8358;2,200.00</p>
                            </div>
                            <p className="font-roboto font-medium text-base text-[#3e6b8e] mt-2">NBD: 05/12/2024</p>
                        </div>
                    </div>

                    <div className="flex flex-row gap-x-3 items-start py-4 border-b">
                        <div>
                            <img src={NetflixLogo} alt="netflix logo" />
                        </div>
                        <div className="w-full">
                            <div className="flex flex-row items-center justify-between">
                            <p className="font-roboto text-base text-[#808080]">Netflix</p>
                            <p className="font-roboto text-base text-[#808080]">&#8358;2,200.00</p>
                            </div>
                            <p className="font-roboto font-medium text-base text-[#3e6b8e] mt-2">NBD: 05/12/2024</p>
                        </div>
                    </div>

                    <div className="flex flex-row gap-x-3 items-start py-4 border-b">
                        <div>
                            <img src={NetflixLogo} alt="netflix logo" />
                        </div>
                        <div className="w-full">
                            <div className="flex flex-row items-center justify-between">
                            <p className="font-roboto text-base text-[#808080]">Netflix</p>
                            <p className="font-roboto text-base text-[#808080]">&#8358;2,200.00</p>
                            </div>
                            <p className="font-roboto font-medium text-base text-[#3e6b8e] mt-2">NBD: 05/12/2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Dashboard