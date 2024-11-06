
import { useState, Fragment } from "react";
import MoneyBagIcon from "../assets/icons/money-bag-icon.svg"
import SubCountIcon from "../assets/icons/sub-count-icon.svg"
import NetflixLogo from "../assets/icons/netflix-logo.svg"
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import servicesData from "../services.json"


function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [serviceName, setServiceName] = useState('');
    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const validateServiceName = () => {
        
    }

      
  return (
    <main className="bg-[#fafafa] h-full">
        <div className="mx-4 md:mx-12 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between w-full">
                <div>
                    <h1 className="font-montserrat text-3xl md:text-4xl font-bold text-[#2d2d2d] leading-normal md:leading-loose">My Dashboard</h1>
                    <p className="text-sm font-roboto text-[#808080] md:w-8/12 leading-relaxed">Overview of your payments</p>
                </div>

                <div className="'md:w-auto mt-8 md:mt-0 ms-auto md:ml-auto">
                    <button type="submit" className="bg-[#F5B400] text-[#2d2d2d] text-center font-roboto rounded-lg px-6 py-2.5 md:py-2.5 hover:bg-[#E3A000]" onClick={handleModalOpen}>Add Subscription</button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mt-12">
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


            {/* Modal */}
                <div>
                    {/* Modal */}
                    <Transition appear show={isModalOpen} as={Fragment}>
                            <Dialog as="div" className="relative z-30" onClose={handleModalClose}>
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-[#2d2d2d] bg-opacity-25" />
                            </TransitionChild>

                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <TransitionChild
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <DialogPanel className="w-full max-w-md transform overflow-hidden bg-[#fff] rounded-lg p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-end">
                                        <button type="button" className="rounded-full p-1 hover:bg-[#EAF0F6]" onClick={handleModalClose}>
                                        <XMarkIcon className="h-6 w-6 text-[#3E6B8E]" />
                                        </button>
                                    </div>
                                    <DialogTitle as="h3" className="text-2xl font-bold font-montserrat text-[#3E6B8E]">
                                        Add a Subscription
                                    </DialogTitle>
                                    <div className="mt-3">
                                    <form>
                                        {/* Service name */}
                                        <div className="mt-6">
                                        <label htmlFor="service_name" className="block text-sm font-roboto text-[#2d2d2d]">
                                            Service Name
                                        </label>
                                        <select
                                            id="service_name"
                                            name="service_name"
                                            className="mt-3 block w-full px-4 py-3 font-os text-base border border-[#D1D1D1] outline-none sm:text-sm rounded-lg"
                                            // value={formData.list}
                                            // onChange={handleChange}
                                        >
                                            <option value="">Select a service</option>
                                            {servicesData.services.map((service, index) => (
                                                <option className="font-roboto text-[#2d2d2d]" key={index} value={service}>{service}</option>
                                            ))}
                                        </select>
                                        </div>

                                        {/* Billing amount */}
                                        <div className="mt-6">
                                        <label htmlFor="billing_amount" className="block text-sm font-roboto text-[#2d2d2d]">
                                            Billing Amount
                                        </label>
                                        <input type="text" name="billing_amount" value={serviceName} onChange={(e) => setServiceName(e.target.value)} onBlur={() => validateServiceName(serviceName)} className="mt-3 font-roboto mx-auto w-full md:w-full block rounded-lg border border-[#D1D1D1] px-4 py-3 text-base text-[#2d2d2d] placeholder:text-[#ccc] outline-[#3E6B8E] '" placeholder="Service name (e.g., Netflix)" />
                                        {/* {emailError && <p className='text-sm text-[#E34F4F] mt-1'>{emailError}</p>} */}
                                        </div>

                                        {/* Billing frequency dropdown */}
                                        <div className="mt-6">
                                        <label htmlFor="billing_frequency" className="block text-sm font-roboto text-[#2d2d2d]">
                                            Billing Frequency
                                        </label>
                                        <select
                                            id="billing_frequency"
                                            name="billing_frequency"
                                            className="mt-3 block w-full px-4 py-3 font-os text-base border border-[#D1D1D1] outline-none sm:text-sm rounded-lg"
                                            // value={formData.list}
                                            // onChange={handleChange}
                                        >
                                            <option value="">Select billing frequency</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Yearly">Yearly</option>
                                        </select>
                                        </div>

                                        {/* Last billing date */}
                                        <div className="mt-6">
                                        <label htmlFor="billing_date" className="block text-sm font-roboto text-[#2d2d2d]">
                                            Last Billing Date
                                        </label>
                                        <input type="date" name="billing_date" value={serviceName} onChange={(e) => setServiceName(e.target.value)} onBlur={() => validateServiceName(serviceName)} className="mt-3 font-roboto mx-auto w-full md:w-full block rounded-lg border border-[#D1D1D1] px-4 py-3 text-base text-[#2d2d2d] placeholder:text-[#ccc] outline-[#3E6B8E] '" />
                                        {/* {emailError && <p className='text-sm text-[#E34F4F] mt-1'>{emailError}</p>} */}
                                        </div>

                                        {/* Submit and Cancel buttons */}
                                        <div className="mt-10 flex flex-col-reverse gap-y-4 md:flex-row md:justify-end md:space-x-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-primary-600 bg-lightgray-100 px-8 py-3 text-sm font-os font-medium text-primary-600"
                                            onClick={handleModalClose}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center px-8 py-3 text-sm font-os font-medium text-[#fff] bg-[#2E7D32] hover:bg-[#29702d] mx-auto w-full md:w-fit rounded-lg"
                                            // disabled={loadingSubmit} 
                                            // onClick={handleSubmit}
                                        >
                                            {/* {loadingSubmit ? "Adding..." : "Add Subscription"} */}
                                        </button>
                                        </div>
                                    </form>
                                    </div>
                                    </DialogPanel>
                                </TransitionChild>
                                </div>
                            </div>
                            </Dialog>
                        </Transition>
                </div>
        </div>
    </main>
  )
}

export default Dashboard