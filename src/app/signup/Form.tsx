'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { registerSchema } from '@/lib/schemas'

export default function RegisterForm() {
	const router = useRouter()

	const form = useForm({
		resolver: zodResolver(registerSchema)
	})

	const onSubmit = async (values: any) => {
		const res = await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: values.name,
				email: values.email,
				password: values.password
			})
		})

		const data = await res.json()

		if (res.status !== 201) {
			toast.error(data.message)
		} else {
			toast.success('Вы успешно зарегистрировались')

			const signInResult = await signIn('credentials', {
				redirect: false,
				email: values.email,
				password: values.password
			})

			if (!signInResult?.error) {
				router.push('/')
			} else {
				toast.error('Ошибка входа после регистрации')
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
							<FormLabel>Имя пользователя</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='John'
									className='focus-visible:ring-2 bg-slate-800 focus:bg-slate-500'
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
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type='email'
									{...field}
									placeholder='Neo@gmail.com'
									className='focus-visible:ring-2 bg-slate-800 focus:bg-slate-500'
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
							<FormLabel>Пароль</FormLabel>
							<FormControl>
								<Input
									type='password'
									{...field}
									placeholder='••••••••'
									className='focus-visible:ring-2 bg-slate-800 focus:bg-slate-500'
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
							<FormLabel>Подтверждение пароля</FormLabel>
							<FormControl>
								<Input
									className='focus-visible:ring-2 bg-slate-800 focus:bg-slate-500'
									type='password'
									{...field}
									placeholder='••••••••'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type='submit'
					className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700'
				>
					Зарегистрироваться
				</Button>

				<p className='text-center'>
					Уже зарегистрированы?{' '}
					<Link href='/signin' className='text-blue-500 hover:underline'>
						Войти
					</Link>
				</p>
			</form>
		</Form>
	)
}
