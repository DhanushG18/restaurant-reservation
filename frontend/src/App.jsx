import "./App.css";
import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    date: "",
    time: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReservation = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/v1/reservation/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Reservation failed");
      }

      setMessage("Reservation sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        date: "",
        time: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      setMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="nav">
        <h2>Zeesh Restaurant</h2>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Menu</li>
          <li>Team</li>
          <li>Reservation</li>
        </ul>
        <button className="menu-btn">Our Menu</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1>Delicious Food Dishes</h1>
        </div>
        <img
          src="https://images.unsplash.com/photo-1550547660-d9450f859349"
          alt="burger"
        />
      </section>

      {/* POPULAR DISHES */}
      <section className="dishes">
        <h2>Popular Dishes</h2>

        <div className="cards">
          <div className="card">
            <img src="https://images.unsplash.com/photo-1551183053-bf91a1d81141" />
            <p>Roasted Lamb</p>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288" />
            <p>Salmon Dish</p>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" />
            <p>Sea Food</p>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea" />
            <p>Dessert</p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="team">
        <h2>Our Team</h2>
        <div className="team-row">
          <div className="chef">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" />
            <p>Head Chef</p>
          </div>
          <div className="chef">
            <img src="https://randomuser.me/api/portraits/men/45.jpg" />
            <p>Sous Chef</p>
          </div>
          <div className="chef">
            <img src="https://randomuser.me/api/portraits/men/12.jpg" />
            <p>Fast Food Chef</p>
          </div>
        </div>
      </section>

      {/* RESERVATION */}
      <section className="reservation">
        <form className="reserve-card" onSubmit={handleReservation}>
          <h2>Make a Reservation</h2>

          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Reserve Now"}
          </button>
          {message && <p className="form-message">{message}</p>}
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Zeesh Restaurant</p>
      </footer>
    </>
  );
}

export default App;