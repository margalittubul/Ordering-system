import '../App.css'
import {Outlet} from 'react-router-dom'
//ייבאו של הקומפוננטות
import Header from './Header'
import Footer from './Footer'
export default function Root()
{
    return(
        <>
        <header>
        <div className='header'>
        {/* components */}
        <Header/>
        
        </div> 
        </header>
        <br/>
        <br/>
        <br/>
        <br/>
        <main>
            <div className="main">
                 <Outlet/>
            </div>
        </main>

        <footer>
        <div className='footer'>
          {/* components */}
          <Footer/>
        </div>
        </footer>  
        </>
    );
}