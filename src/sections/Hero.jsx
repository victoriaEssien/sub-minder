
import { Link } from "react-router-dom"

function Hero() {
  return (
    <section className="mx-4 md:mx-12">
        <h1>This is the entry point of the site</h1>
        <div>
            <Link to="/login">Manage my Subscriptions now</Link>
        </div>
    </section>
  )
}

export default Hero