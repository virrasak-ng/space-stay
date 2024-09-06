import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import GiteIcon from '@mui/icons-material/Gite';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

export const AccountCardTabs = ({ id, title, content }) => {
  return (
    <Card sx={{ minWidth: 400, minHeight: 250, paddingLeft:"20px", flex:1}}>
      <Box sx={{padding:1, paddingTop:"20px"}}>
        {id === "personalInfo" ? (
          <PermContactCalendarIcon sx={{ fontSize: 50, color:"#9966CC"}} />
        ) : null}
        {id === "myBooking" ? (
          <GiteIcon sx={{ fontSize: 50, color:"#9966CC"}} />
        ) : null}
        {id === "myAccomodation" ? (
          <AddBusinessIcon sx={{ fontSize: 50, color:"#9966CC"}} />
        ) : null}
      </Box>

      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 20 }}>
          {title}
        </Typography>

        <Typography variant="body2">{content}</Typography>
      </CardContent>
      <CardActions>{/* <Button size="small"></Button> */}</CardActions>
    </Card>
  );
};

export default AccountCardTabs;
