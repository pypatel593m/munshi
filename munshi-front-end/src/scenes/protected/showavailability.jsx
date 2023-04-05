import { convertTo12Hour } from "../../util";
import {
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";


const ShowAvailability = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const user_id = window.location.pathname.split("/")[2];
  const [rows, setRows] = useState([]);

  const available_date = window.location.pathname.split("/")[3];
  const business_id = window.location.pathname.split("/")[4];
  useEffect(() => {
    console.log(user_id, available_date, business_id);
    Axios.post(`${process.env.REACT_APP_API_URL}/getavailability`, {
      user_id: user_id,
      available_date: available_date,
      business_id: business_id,
    })
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => console.error(error));
  }, [user_id, available_date, business_id]);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent={"center"}>
        {rows.length > 0 ? (
          <Box
            display="grid"
            gap="30px"
            marginLeft={10}
            justifyContent={"center"}
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }} //sx={{ gridColumn: "span 2" }}
          >
            <Box sx={{ gridColumn: "span 2" }}>
              <h2>Availability ID:</h2>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
              <h2>{rows[0].availability_id}</h2>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
              <h2>User ID:</h2>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
              <h2>{rows[0].user_id}</h2>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
              <h2>Date:</h2>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
              <h2>{rows[0].available_date.substring(0, 10)}</h2>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
              <h2>Available From:</h2>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
              <h2>{convertTo12Hour(rows[0].available_time_from)}</h2>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
              <h2>Available Untill:</h2>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
              <h2>{convertTo12Hour(rows[0].available_time_till)}</h2>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
              <h2>Requests/Notes:</h2>
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
              <h2>{rows[0].notes}</h2>
            </Box>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default ShowAvailability;
