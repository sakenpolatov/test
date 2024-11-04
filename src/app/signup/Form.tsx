'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { registerSchema } from '@/lib/schemas'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { reloadSession } from '@@/lib/reloadSession'

export default function RegisterForm() {
	const form = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	})
	const router = useRouter()

	const onSubmit = async (values: any) => {
		if (Object.keys(form.formState.errors).length > 0) {
			return
		}

		const res = await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(values)
		})

		if (res.status === 201) {
			// После успешной регистрации войти в систему автоматически
			const signInResponse = await signIn('credentials', {
				redirect: false,
				email: values.email,
				password: values.password
			})

			if (signInResponse?.ok) {
				reloadSession()
				router.push('/')
			}
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-500 dark:text-gray-300'>
								Имя пользователя
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='John'
									className='focus-visible:ring-2 bg-slate-800 focus:bg-slate-500 dark:bg-gray-800 dark:text-white border dark:border-gray-700'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-500 dark:text-gray-300'>
								Email
							</FormLabel>
							<FormControl>
								<Input
									type='email'
									{...field}
									placeholder='example@mail.com'
									className='focus-visible:ring-2 bg-slate-800 focus:bg-slate-500 dark:bg-gray-800 dark:text-white border dark:border-gray-700'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-500 dark:text-gray-300'>
								Пароль
							</FormLabel>
							<FormControl>
								<Input
									type='password'
									{...field}
									placeholder='••••••••'
									className='focus-visible:ring-2 bg-slate-800 focus:bg-slate-500 dark:bg-gray-800 dark:text-white border dark:border-gray-700'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='confirmPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-gray-500 dark:text-gray-300'>
								Подтверждение пароля
							</FormLabel>
							<FormControl>
								<Input
									type='password'
									{...field}
									placeholder='••••••••'
									className='focus-visible:ring-2 bg-slate-800 focus:bg-slate-500 dark:bg-gray-800 dark:text-white border dark:border-gray-700'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type='submit'
					className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600'
				>
					Зарегистрироваться
				</Button>

				<p className='text-center text-gray-500 dark:text-gray-300'>
					У Вас уже есть аккаунт?{' '}
					<Link href='/signin' className='text-blue-500 hover:underline'>
						Войти
					</Link>{' '}
					в аккаунт
				</p>
			</form>
		</Form>
	)
}
