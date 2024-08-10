import * as z from "zod";

export const LoginSchema = z.object ({
  email: z
    .string({
      invalid_type_error: "must be a string value"
    })
    .email({
      message: "email is required"
    }),
  password: z
    .string()
    .min(1, {
      message: "password is required"
    })
})

export const RegisterSchema = z.object ({
  email: z
    .string({
      invalid_type_error: "must be a string value"
    })
    .email({
      message: "email is required"
    }),
  password: z
    .string()
    .min(6, {
      message: "minimum 6 characters required"
    }),
  name: z
    .string()
    .min(1, {
      message: "name is required"
    }),
})

export const ResetSchema = z.object ({
  email: z
    .string({})
    .email({
      message: "email is required"
    })
})