import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

interface IProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: IProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-[#F8F2E8]">{children}</main>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
