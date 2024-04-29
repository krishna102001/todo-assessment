import Footer from "../components/Footer";
import Header from "../components/Header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className='bg-gray-300 h-screen'>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
