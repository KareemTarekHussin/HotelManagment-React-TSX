import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material';

export default function SideBar() {

  const navigate = useNavigate();
 
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [iconRotation, setIconRotation] = useState(1);
  let [isCollapse, setIsCollapse] = useState(true);
  let [collapsedWidth, setCollapsedWidth] = useState("80px");

  const updateCollapsedWidth = () => {
    const width = window.innerWidth;
    if (width <= 576) {
      setCollapsedWidth("60px");
    } else if (width <= 768) {
      setCollapsedWidth("80px");
    } else if (width <= 992) {
      setCollapsedWidth("80px");
    } else {
      setCollapsedWidth("80px");
    }
  };

  useEffect(() => {
    updateCollapsedWidth();
    window.addEventListener('resize', updateCollapsedWidth);
    return () => window.removeEventListener('resize', updateCollapsedWidth);
  }, []);

  
  // ?============================================================================================


  // const togglePassword = (field: keyof PasswordState) => {
  //   setShowPassword((prevState) => ({ ...prevState, [field]: !prevState[field] }));
  // };
  
  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
    setIconRotation(prevRotation => prevRotation === 1 ? -1 : 1);
  }
  
  // const onSubmit = async (data: any) => {
  //   try{
      
  //     let response = await axios.put(`${baseUrl}/Users/ChangePassword`, data,
  //       {
  //         headers: requestHeaders
  //       });
     
     
     
  //    getToast("success", response.data.message)
  //     logout()
  //     console.log(data);
      
  //   }
  //   catch (error) {
      
  //     console.log(error);
  //   }
  // }
  

  // *========================================><=============================================//
  return (
    
    <>

<Drawer
      variant="permanent"
      sx={{
        // width: drawerWidth,
        flexShrink: 0,
        // [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {['Home', 'Users', 'Projects', 'Tasks', 'Change Password', 'Logout'].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
       
      {/* <Sidebar 
          collapsed={isCollapse} 
          style={{ backgroundColor: '#1F263E' }}
          // breakPoint={breakPoint}
          collapsedWidth={collapsedWidth}
          className='border-0 bg-danger'
          >
          <Menu className='my-5 py-5'>

            <MenuItem
              className='text-center d-none d-md-block'
              onClick={handleCollapse}
            >
              <div className="icon-container bg-warnin p-2 rounded-3" style={isCollapse? { transform: `scaleX(${iconRotation})` }: { transform: `scaleX(${iconRotation})` }}>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </MenuItem>
            
            <MenuItem 
              className='mt-4 mb-2'
              component={<Link to="" />} 
              icon={<i className="fa-solid fa-house"></i>}
            >
              <span>Home</span>
            </MenuItem>

  <MenuItem 
            className="mb-2"
              component={<Link to="users" />} 
              icon={<i className="fa-solid fa-users"></i>}
            >
              Users
            </MenuItem>
          

            <MenuItem 
            className="mb-2"
              component={<Link to="projects" />} 
              icon={<i className="fa-solid fa-bars-progress"></i>}
            >
            Projects
            </MenuItem>

            <MenuItem 
            className="mb-2"
              component={<Link to="tasks" />} 
              icon={<i className="fa-solid fa-tasks"></i>}
            >
            Tasks
            </MenuItem>

            <MenuItem 
            className="mb-2"
              onClick={handleShow}
              icon={<i className="fa-solid fa-unlock"></i>}
            >
              Change Password
            </MenuItem>

            <MenuItem 
            className="mb-2"
              // onClick={logout}
              icon={<i className="fa-solid fa-circle-left"></i>}
            >
              Logout
            </MenuItem>

            

          </Menu>
        </Sidebar>         */}

      {/* TODO:modal mui */}
     


      

    </>
  )
}
