export const metadata = {
  title: "KuroKage",
  description: "Anime × Streetwear × Fashion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
