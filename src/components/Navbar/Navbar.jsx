
import Logo from './Logo'
import Search from '../Navbar/Search'
import Dropdownlistmenu from './Dropdownlistmenu'
import Checkslip from '../easyslip/Checkslip'

const Navbar = () => {
  return (
    <nav>
      <div className="flex flex-col items-center justify-between sm:flex-row py-6 gap-4 mx-5">
      <Logo/>
      <Search/>
      <Dropdownlistmenu/>
    
      
        
          
        
      
      </div>
    </nav>
  )
}

export default Navbar