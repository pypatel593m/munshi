import Header  from "../../components/Header";
import {useParams} from 'react-router-dom';
import {Box, TextField} from "@mui/material"; 
import React, { useState, useEffect }  from 'react';
import Axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import {User} from "../../users";



const UserProfile = () => {
  const selected_user_id = useParams().id;
  let [user, setUser] = useState(null);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
  Axios.post(`${process.env.REACT_APP_API_URL}/userprofile`, {
    user_id: selected_user_id,
  }).then((response) => {
    setUser(new User(response.data[0].user_id, response.data[0].user_email_address, response.data[0].user_password, response.data[0].user_fname, response.data[0].user_lname, response.data[0].user_phone, response.data[0].user_address, response.data[0].user_type_id, false));
    console.log(user);
  })
  .catch((error) => console.error(error));
  }, [selected_user_id,user]); 

  

  return <Box m="20px">
  <Box  display="flex" marginTop={10} justifyContent={"center"}>
          
          <div>
            <div className="form-box login">
              <Header title="Employee Profile" subtitle="All about your employee"/>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  value={user?.m_user_fname}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  value={user?.m_user_lname}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  value={user?.m_user_email_address}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  value={user?.m_user_phone}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  value={user?.m_user_address}
                  sx={{ gridColumn: "span 4" }}
                />
                </Box>
            </div>
          </div>
  </Box>
  
</Box>;
}
    


export default UserProfile;