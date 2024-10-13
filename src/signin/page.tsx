import { signIn } from '@@/lib/auth'

export default function SignIn() {
	return (
		<form
			action={async formData => {
				await signIn('credentials', formData)
			}}
		>
			<label>Email</label>
			<input name='email' type='email' />
			<label>Password</label>
			<input name='password' type='password' />
			<button type='submit'>Sign In</button>
		</form>
	)
}
