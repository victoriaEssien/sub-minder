
import { Link } from "react-router-dom"

function Hero() {
  return (
    <section className="bg-hero h-screen">
        <div className="mx-4 md:mx-12 pt-14">
            <h1 className="font-montserrat text-5xl text-center font-extrabold text-[#3E6B8E] leading-loose ">Manage Your subscriptions with Ease!</h1>
            <p className="text-base font-roboto text-center text-[#808080] mx-auto w-8/12 leading-relaxed">Track your payments and receive timely reminders, ensuring you&apos;re always prepared when bills are due. Say goodbye to surprise charges and hello to financial peace of mind!</p>
            <div className="mx-auto w-fit mt-12">
                <Link to="/login" className="block bg-[#F5B400] text-[#2D2D2D] font-roboto rounded-lg px-6 py-3.5 hover:bg-[#E3A000]">Manage my Subscriptions</Link>
            </div>

            <div>
                <img src="https://assets.justinmind.com/wp-content/uploads/2020/02/dashboard-example-keyhub.png" className="mt-14 rounded-lg" alt="" />
            </div>
        </div>
    </section>
  )
}

export default Hero