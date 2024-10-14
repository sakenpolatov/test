'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const GoogleButton = () => {
	const handleGoogleSignIn = async () => {
		await signIn('google', { callbackUrl: '/' })
	}

	return (
		<Button
			onClick={handleGoogleSignIn}
			className='w-full bg-white text-black py-2 px-4 rounded-md hover:bg-gray-100 border dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 flex items-center justify-center'
		>
			<Image
				src='/google-logo.svg'
				alt='Google logo'
				width={24}
				height={24}
				className='mr-3'
			/>
			<span className='ml-2'>Google</span>
		</Button>
	)
}

export default GoogleButton
