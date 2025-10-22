import { Outlet } from 'react-router-dom';
import SideBarAdmin from './SideBarAdmin';
import "../css/style.css"; 

function AdminLayout() {
  return (
    <div className="d-flex">
      <SideBarAdmin />
      <main className="main-content rosegold m-1 p-4 w-100">
        <Outlet /> 
      </main>
    </div>
  );
}

export default AdminLayout;