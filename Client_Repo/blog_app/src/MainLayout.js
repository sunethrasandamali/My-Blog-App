import { Outlet } from "react-router-dom";
import BlogHeader from './BlogHeader';

function MainLayout(){
    return(
        <main>
          <BlogHeader/>
          <Outlet/>
        </main>
    );
}

export default MainLayout;