import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Typography } from "@mui/material";

export const DateRangeFilter = ({startLabel, endLabel}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <Box sx={{display:"flex", gap:"20px", alignItems:"center"}}>
          <DatePicker label={startLabel} />
          <Typography>to</Typography>
          <DatePicker label={endLabel} />
        </Box>
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DateRangeFilter
