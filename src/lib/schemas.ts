import { z } from 'zod'

export const registerSchema = z
	.object({
		name: z.string().min(1, { message: 'Имя не может быть пустым' }),
		email: z
			.string()
			.email('Неправильный email')
			.min(1, { message: 'Email не может быть пустым' }),
		password: z
			.string()
			.min(6, { message: 'Пароль должен быть не менее 6 символов' }),
		confirmPassword: z
			.string()
			.min(6, { message: 'Пароль должен быть не менее 6 символов' })
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				message: 'Пароли не совпадают',
				path: ['confirmPassword']
			})
		}
	})

export const loginSchema = z.object({
	email: z
		.string()
		.email('Неправильный email')
		.min(1, { message: 'Email не может быть пустым' }),
	password: z
		.string()
		.min(6, { message: 'Пароль должен быть не менее 6 символов' })
})

export const markFormSchema = z.object({
	type: z.string().min(1, 'Укажите тип'),
	location: z.string().min(1, 'Укажите локацию'),
	source: z.string().min(1, 'Укажите источник'),
	comment: z.string().optional()
})
