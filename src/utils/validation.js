import * as Yup from "yup";

const phoneRegex = /\+\d\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/;

Yup.addMethod(Yup.string, "phoneNumber", function phoneNumber(errorMessage) {
	return this.test("test-phone-number", errorMessage, function (value) {
		const { path, createError } = this;

		return (
			(value && phoneRegex.test(value)) ||
			createError({ path, message: errorMessage })
		);
	});
});
