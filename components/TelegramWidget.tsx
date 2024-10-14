'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'

import { signIn } from 'next-auth/react'

const TelegramWidget = () => {
	const handleGoogleSignIn = async () => {
		await signIn('google', { callbackUrl: '/' })
	}
	return (
		<Button
			onClick={handleGoogleSignIn}
			variant='outline'
			size='lg'
			className='flex items-center justify-between gap-2'
		>
			<Image
				src='/google-logo.svg'
				alt='Google logo'
				width={24}
				height={24}
				className='mr-3'
			/>
			<p className='ml-2'>Telegram</p>
		</Button>
	)
}

export default TelegramWidget
