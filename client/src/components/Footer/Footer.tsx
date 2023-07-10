import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import "./footer.css";
function Copyright() {
  return (
    <Typography className="footer-text" style={{ color: "white" }} variant="body2">
      {"تمامی حقوق مادی و معنوی این وب سایت متعلق به دانشگاه صنعتی ارومیه می باشد ©"}
      {new Date().getFullYear()}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Footer = () => {
  return (
    <div className="footer">
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Box
          component="footer"
          sx={{
            py: 2,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) => (theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[700])
          }}
        >
          <Container maxWidth="sm">
            <Copyright />
          </Container>
        </Box>
      </ThemeProvider>
    </div>
  );
};
export default Footer;
