import { CartProvider } from "../context/CartContext";
import "./globals.css";

export const metadata = {
  title: "KuroKage",
  description: "Wear the Shadow"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
