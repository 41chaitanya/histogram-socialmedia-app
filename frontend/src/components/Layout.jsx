import Sidebar from './Sidebar';
import ThreeBackground from './ThreeBackground';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <ThreeBackground />
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
