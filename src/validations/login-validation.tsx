import * as yup from "yup"

export const schema=yup.object().shape({
    email:yup.string().email("Enter a valid email").required("Email is required"),
    password:yup.string().min(4).max(20).matches(
        /^(?=.*[A-Z])(?=.*[0-9]).*$/,
        'Password must contain at least one capital letter and one number'
      ).required("Password is required"),
})
