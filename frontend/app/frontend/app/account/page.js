import Navbar from "../../components/Navbar";
import Login from "../../components/Login";

export default function Account() {
  return (
    <main>
      <Navbar />

      <section>
        <h1>My Account</h1>

        <Login />
      </section>
    </main>
  );
}
