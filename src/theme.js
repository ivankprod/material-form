import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

export const theme = createTheme({
	cssVariables: true,
	palette: {
		primary: {
			main: green[400]
		}
	}
});

export default theme;
