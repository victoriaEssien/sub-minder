
import { useState, Fragment, useEffect } from "react";
import { db } from "../firebase_setup/firebase";
import { collection, addDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import MoneyBagIcon from "../assets/icons/money-bag-icon.svg"
import SubCountIcon from "../assets/icons/sub-count-icon.svg"
import NetflixLogo from "../assets/icons/netflix-logo.svg"
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import servicesData from "../services.json"
import currenciesData from "../currencies.json"


function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [serviceName, setServiceName] = useState('');
    const [billingAmount, setBillingAmount] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [billingFrequency, setBillingFrequency] = useState('');
    const [lastBillingDate, setLastBillingDate] = useState('');
    const [userId, setUserId] = useState(null);
    const [errors, setErrors] = useState({});
    const [subscriptions, setSubscriptions] = useState([]);
    const [loadingSubscriptions, setLoadingSubscriptions] = useState(true); // New loading state
    const [loadingSave, setLoadingSave] = useState(false); // New loading state for save button


    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);  // Set the userId from Firebase user
                fetchSubscriptions(user.uid);  // Fetch subscriptions when user is authenticated
            } else {
                console.log("User is not authenticated");
            }
        });
    
        // Cleanup the listener when the component is unmounted
        return () => unsubscribe();
    }, []);
    
    

    const fetchSubscriptions = async (uid) => {
        try {
            const subscriptionsRef = collection(db, "users", uid, "subscriptions");
            const snapshot = await getDocs(subscriptionsRef);
            const subs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setSubscriptions(subs);
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
        } finally {
            setLoadingSubscriptions(false); // Set loading subscriptions to false
        }
    };

    // Helper function to calculate next billing date
    const calculateNextBillingDate = (lastBillingDate, billingFrequency) => {
        const date = new Date(lastBillingDate);
        if (billingFrequency === "Monthly") {
            date.setMonth(date.getMonth() + 1);
        } else if (billingFrequency === "Yearly") {
            date.setFullYear(date.getFullYear() + 1);
        }
        return date;
    };

    // Helper function to calculate the exact next billing date based on days remaining
    const calculateNextBillingDateFromDays = (daysRemaining) => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + daysRemaining);
        return currentDate;
    };

    // Helper function to calculate days until next billing
    const daysUntilNextBilling = (nextBillingDate) => {
        const currentDate = new Date();
        const timeDiff = nextBillingDate - currentDate;
        return Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert to days
    };

    // Function to format "In X days"
    const formatDaysUntilNextBilling = (days) => {
        if (days <= 5) {
            return <span className="text-[#E34F4F]">Due In {days} days</span>;
        }
        return `In ${days} days`;
    };

    // Sort subscriptions by next billing date
    const sortedSubscriptions = subscriptions.map(subscription => {
        const nextBillingDate = calculateNextBillingDate(subscription.lastBillingDate, subscription.billingFrequency);
        const daysRemaining = daysUntilNextBilling(nextBillingDate);
        // Calculate the next billing date based on days remaining
    const preciseNextBillingDate = calculateNextBillingDateFromDays(daysRemaining);
        return { ...subscription, nextBillingDate: preciseNextBillingDate, daysRemaining };
    }).sort((a, b) => a.nextBillingDate - b.nextBillingDate);


    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => {
        setIsModalOpen(false);
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;
    
        if (!serviceName) {
            newErrors.serviceName = "Service name is required.";
            isValid = false;
        }
        if (!billingAmount || Number.isNaN(Number.parseFloat(billingAmount))) {
            newErrors.billingAmount = "Billing amount must be a valid number.";
            isValid = false;
        }
        if (!billingFrequency) {
            newErrors.billingFrequency = "Billing frequency is required.";
            isValid = false;
        }
        if (!lastBillingDate) {
            newErrors.lastBillingDate = "Last billing date is required.";
            isValid = false;
        }
    
        setErrors(newErrors);
        setTimeout(() => setErrors({}), 5000); // Clear errors after 5 seconds
        return isValid; // Return the result of validation
    };
    

    const handleSaveSubscription = async (e) => {
        e.preventDefault();

        if (!userId) {
            alert("You must be logged in to add a subscription.")
            return;
        }

        setLoadingSave(true); // Set loading save to true

        // Ensure form is validated
        if (!validateForm()) {
            return; // Stop here if validation fails
        }

        try {
            const userDocRef = doc(db, "users", userId); // Reference to the current user's document
            const userDocSnapshot = await getDoc(userDocRef);

            if (!userDocSnapshot.exists()) {
                console.log("User document not found.");
                return;
            }

            // Add subscription as a sub-collection under the user's document
            const subscriptionRef = collection(userDocRef, "subscriptions");
            await addDoc(subscriptionRef, {
                serviceName,
                billingAmount: Number.parseFloat(billingAmount),
                currency,
                billingFrequency,
                lastBillingDate,
            });

            alert("Subscription added successfully!");
            handleModalClose();
            // Reset form fields
            setServiceName('');
            setBillingAmount('');
            setCurrency('USD');
            setBillingFrequency('');
            setLastBillingDate('');
            // Refresh subscriptions after adding a new one
            fetchSubscriptions(userId)
        } catch (error) {
            console.error("Error adding subscription: ", error);
        } finally {
            setLoadingSave(false); // Set loading save to false
            setLoadingSubscriptions(false);
        }
    };

    // Dynamically calculate total monthly cost and total subscriptions
    const NGNCost = subscriptions
        .filter(subscription => subscription.currency === "NGN")
        .reduce((total, subscription) => total + subscription.billingAmount, 0)
        .toLocaleString();

        const USDCost = subscriptions
        .filter(subscription => subscription.currency === "USD")
        .reduce((total, subscription) => total + subscription.billingAmount, 0)
        .toLocaleString();

    const totalSubscriptions = subscriptions.length;


      
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
                                {/* Total Subscriptions */}
                                <div className="flex flex-col bg-[#fff] px-6 py-6 rounded-lg w-full md:w-3/12">
                    <div className="flex flex-row items-center justify-between">
                    <h5 className="text-sm font-roboto text-[#808080]">Total Subscriptions</h5>
                    <img src={SubCountIcon} alt="" />
                    </div>
                    <h1 className="text-[32px] font-roboto font-extrabold text-[#3E6B8E]">{totalSubscriptions}</h1>
                </div>

                {/* NGN cost card */}
                <div className="flex flex-col bg-[#fff] p-6 rounded-lg w-full md:w-3/12">
                    <div className="flex flex-row items-center justify-between">
                    <h5 className="text-sm font-roboto text-[#808080]">NGN Cost</h5>
                    <img src={MoneyBagIcon} alt="" />
                    </div>
                    <h1 className="text-[32px] font-roboto font-extrabold text-[#3E6B8E]">&#8358; {NGNCost}</h1>
                </div>

                {/* USD cost card */}
                <div className="flex flex-col bg-[#fff] p-6 rounded-lg w-full md:w-3/12">
                    <div className="flex flex-row items-center justify-between">
                    <h5 className="text-sm font-roboto text-[#808080]">USD Cost</h5>
                    <img src={MoneyBagIcon} alt="" />
                    </div>
                    <h1 className="text-[32px] font-roboto font-extrabold text-[#3E6B8E]">&#36; {USDCost}</h1>
                </div>
                
            </div>

            <div className="mt-16">
                <h2 className="font-montserrat text-2xl font-bold text-[#2d2d2d] leading-normal md:leading-loose">Subscription Overview</h2>

                <div className="mt-10 bg-[#fff] p-6 rounded-lg">
                    {/* Subscription service list */}
                    {loadingSubscriptions ? (
                            <p className="text-center text-[#808080]">Loading subscriptions...</p>
                        ) : subscriptions.length > 0 ? (
                            sortedSubscriptions.map((subscription) => (
                                <div key={subscription.id} className="flex flex-row gap-x-3 items-start py-4 border-b">
                                    <div>
                                        <img src={NetflixLogo} alt={`${subscription.serviceName} logo`} />
                                    </div>
                                    <div className="w-full">
                                        <div className="flex flex-row items-center justify-between">
                                            <p className="font-roboto text-base text-[#808080]">{subscription.serviceName}</p>
                                            <p className="font-roboto text-base text-[#808080]">
                                                {subscription.currency} {subscription.billingAmount.toLocaleString()}
                                            </p>
                                        </div>
                                        <p className="font-roboto font-medium text-base text-[#3e6b8e] mt-2">
                                            NBD: {new Date(subscription.nextBillingDate).toLocaleDateString("en-GB")}
                                        </p>
                                        <p className="font-roboto font-medium text-sm text-[#2d2d2d] mt-2">{formatDaysUntilNextBilling(subscription.daysRemaining)}</p>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-[#808080]">No subscriptions added yet.</p>
                        )}
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
                                    <form onSubmit={handleSaveSubscription}>
                                        {/* Service name */}
                                        <div className="mt-6">
                                        <label htmlFor="service_name" className="block text-sm font-roboto text-[#2d2d2d]">
                                            Service Name
                                        </label>
                                        <select
                                            id="service_name"
                                            name="service_name"
                                            value={serviceName}
                                            onChange={(e) => setServiceName(e.target.value)}
                                            className="mt-3 block w-full px-4 py-3 font-os text-base border border-[#D1D1D1] outline-none sm:text-sm rounded-lg"
                                        >
                                            <option value="">Select a service</option>
                                            {servicesData.services.map((service, index) => (
                                                <option className="font-roboto text-[#2d2d2d]" key={index} value={service}>{service}</option>
                                            ))}
                                        </select>
                                        {errors.serviceName && (
                                        <p className="text-sm text-[#E34F4F] mt-1">{errors.serviceName}</p>)}
                                        </div>

                                        {/* Billing amount */}
                                        <div className="mt-6">
                                        <label htmlFor="billing_amount" className="block text-sm font-roboto text-[#2d2d2d]">
                                            Billing Amount
                                        </label>

                                        <div className="flex items-center mt-3">
                                            <select
                                            id="currency"
                                            name="currency"
                                            value={currency}
                                            onChange={(e) => setCurrency(e.target.value)}
                                            className="block md:w-1/4 px-4 py-3 font-os text-base border border-[#D1D1D1] rounded-l-lg outline-none"
                                            >
                                            {currenciesData.currencies.map((currencyOption) => (
                                                <option key={currencyOption.code} value={currencyOption.code}>
                                                {currencyOption.code}
                                                </option>
                                            ))}
                                            </select>

                                            <input
                                            type="text"
                                            name="billing_amount"
                                            value={billingAmount}
                                            onChange={(e) => setBillingAmount(e.target.value)}
                                            className="w-3/4 font-roboto block rounded-r-lg border border-l-0 border-[#D1D1D1] px-4 py-3 text-base text-[#2d2d2d] placeholder:text-[#ccc] outline-[#3E6B8E]"
                                            placeholder="Enter amount"
                                            />
                                        </div>
                                        {errors.billingAmount && (
                                        <p className="text-sm text-[#E34F4F] mt-1">{errors.billingAmount}</p>)}
                                        </div>

                                        {/* Billing frequency dropdown */}
                                        <div className="mt-6">
                                        <label htmlFor="billing_frequency" className="block text-sm font-roboto text-[#2d2d2d]">
                                            Billing Frequency
                                        </label>
                                        <select
                                            id="billing_frequency"
                                            name="billing_frequency"
                                            value={billingFrequency}
                                            onChange={(e) => setBillingFrequency(e.target.value)}
                                            className="mt-3 block w-full px-4 py-3 font-os text-base border border-[#D1D1D1] outline-none sm:text-sm rounded-lg"
                                        >
                                            <option value="">Select billing frequency</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Yearly">Yearly</option>
                                        </select>
                                        {errors.billingFrequency && (
                                        <p className="text-sm text-[#E34F4F] mt-1">{errors.billingFrequency}</p>)}
                                        </div>

                                        {/* Last billing date */}
                                        <div className="mt-6">
                                        <label htmlFor="billing_date" className="block text-sm font-roboto text-[#2d2d2d]">
                                            Last Billing Date
                                        </label>
                                        <input type="date" name="billing_date" value={lastBillingDate} onChange={(e) => setLastBillingDate(e.target.value)} className="mt-3 font-roboto mx-auto w-full md:w-full block rounded-lg border border-[#D1D1D1] px-4 py-3 text-base text-[#2d2d2d] placeholder:text-[#ccc] outline-[#3E6B8E] '" />
                                        {errors.lastBillingDate && (
                                        <p className="text-sm text-[#E34F4F] mt-1">{errors.lastBillingDate}</p>)}
                                        </div>

                                        {/* Submit and Cancel buttons */}
                                        <div className="mt-10 flex flex-col-reverse gap-y-4 md:flex-row md:justify-end md:space-x-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-[#d1d1d1] bg-[#fff] px-8 py-3 text-sm font-roboto text-primary-600"
                                            onClick={handleModalClose}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className={`inline-flex justify-center px-8 py-3 text-sm font-roboto text-[#2d2d2d] bg-[#F5B400] hover:bg-[#E3A000] mx-auto w-full md:w-fit rounded-lg ${loadingSave ? "opacity-50 cursor-not-allowed" : ""}`}
                                            disabled={loadingSave}
                                        >
                                            Save
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