import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/ru";
import { ruRU } from "@mui/x-date-pickers/locales";

import MaskedInput from "./components/MaskedInput";
import "./utils/validation";

import styles from "./App.module.scss";
import { Button } from "@mui/material";

const initialValues = {
	lastName: "",
	name: "",
	surname: "",
	gender: "male",
	birthday: null,
	phone: "",
	email: "",
	address: "",
	employer: ""
};

function App() {
	const validationSchema = Yup.object({
		lastName: Yup.string().required("Поле является обязательным"),
		name: Yup.string().required("Поле является обязательным"),
		surname: Yup.string(),
		gender: Yup.string().required("Поле является обязательным"),
		phone: Yup.string()
			.required("Поле является обязательным")
			.phoneNumber("Номер телефона указан неверно"),
		email: Yup.string()
			.required("Поле является обязательным")
			.email("Email указан неверно"),
		address: Yup.string(),
		employer: Yup.string()
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		validateOnBlur: true,
		validateOnChange: true,
		onSubmit: (values) => {
			alert("Форма валидна, отправляется запрос");

			console.log(values);
		}
	});

	return (
		<main className={styles.wrapper}>
			<Box
				component="form"
				sx={{
					"& > :not(style)": {
						width: "100%",
						gridColumn: "span 2"
					}
				}}
				noValidate
				autoComplete="off"
				className={styles.form}
				onSubmit={formik.handleSubmit}
			>
				<TextField
					label="Фамилия"
					variant="filled"
					name="lastName"
					value={formik.values.lastName}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={
						formik.touched.lastName &&
						Boolean(formik.errors.lastName)
					}
					helperText={
						formik.touched.lastName && formik.errors.lastName
					}
				/>
				<TextField
					label="Имя"
					variant="filled"
					name="name"
					value={formik.values.name}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.name && Boolean(formik.errors.name)}
					helperText={formik.touched.name && formik.errors.name}
				/>
				<TextField
					label="Отчество"
					variant="filled"
					name="surname"
					value={formik.values.surname}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={
						formik.touched.surname && Boolean(formik.errors.surname)
					}
					helperText={formik.touched.surname && formik.errors.surname}
				/>
				<FormControl
					variant="filled"
					error={
						formik.touched.gender && Boolean(formik.errors.gender)
					}
					style={{ gridColumn: "span 1" }}
				>
					<InputLabel id="gender-select-label">Пол</InputLabel>
					<Select
						labelId="gender-select-label"
						id="gender-select"
						name="gender"
						value={formik.values.gender}
						label="Пол"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					>
						<MenuItem value="male">Мужской</MenuItem>
						<MenuItem value="female">Женский</MenuItem>
					</Select>
					<FormHelperText>
						{formik.touched.gender && formik.errors.gender}
					</FormHelperText>
				</FormControl>
				<LocalizationProvider
					dateAdapter={AdapterDayjs}
					adapterLocale={"ru"}
					localeText={
						ruRU.components.MuiLocalizationProvider.defaultProps
							.localeText
					}
				>
					<DatePicker
						label="Дата рождения"
						format="DD/MM/YYYY"
						name="birthday"
						value={formik.values.birthday}
						onChange={async (value) =>
							await formik.setFieldValue("birthday", value)
						}
						onBlur={formik.handleBlur}
						slotProps={{
							textField: {
								variant: "filled",
								sx: { width: "100%" },
								style: { gridColumn: "span 1" },
								error:
									formik.touched.birthday &&
									Boolean(formik.errors.birthday),
								helperText:
									formik.touched.birthday &&
									formik.errors.birthday
							}
						}}
					/>
				</LocalizationProvider>
				<TextField
					label="Мобильный телефон"
					value={formik.values.phone}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.phone && Boolean(formik.errors.phone)}
					helperText={formik.touched.phone && formik.errors.phone}
					name="phone"
					id="phone-input"
					slotProps={{
						input: {
							inputComponent: MaskedInput
						}
					}}
					variant="filled"
					style={{ gridColumn: "span 1" }}
				/>
				<TextField
					label="Email (необязательно)"
					variant="filled"
					name="email"
					value={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
					style={{ gridColumn: "span 1" }}
				/>
				<TextField
					label="Адрес постоянной регистрации"
					variant="filled"
					name="address"
					value={formik.values.address}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={
						formik.touched.address && Boolean(formik.errors.address)
					}
					helperText={formik.touched.address && formik.errors.address}
				/>
				<TextField
					label="Название работодателя"
					variant="filled"
					name="employer"
					value={formik.values.employer}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={
						formik.touched.employer &&
						Boolean(formik.errors.employer)
					}
					helperText={
						formik.touched.employer && formik.errors.employer
					}
				/>
				<Button
					onClick={formik.handleSubmit}
					variant="contained"
					size="large"
					sx={{ color: "#fff" }}
					style={{ gridColumn: 2 }}
				>
					СОХРАНИТЬ
				</Button>
			</Box>
		</main>
	);
}

export default App;
