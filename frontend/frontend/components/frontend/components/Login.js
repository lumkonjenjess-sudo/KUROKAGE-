export default function Login() {
  return (
    <div className="login">
      <h2>KuroKage Account</h2>

      <input 
        type="email" 
        placeholder="Email"
      />

      <input 
        type="password" 
        placeholder="Password"
      />

      <button>
        Login
      </button>

      <button>
        Create Account
      </button>
    </div>
  );
}
