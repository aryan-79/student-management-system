import Providers from "@/components/providers";
import Navbar from "@/components/navbar";
import Wrapper from "@/components/wrapper";
import "@/globals.css";
export const metadata = {
  title: "SMS",
  desc: "Student management system",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <Navbar />
          <main className="app">
            <Wrapper>{children}</Wrapper>
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
