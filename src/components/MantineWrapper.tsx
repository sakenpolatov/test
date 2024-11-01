'use client'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'

const MantineWrapper: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	return (
		<MantineProvider>
			<ModalsProvider>{children}</ModalsProvider>
		</MantineProvider>
	)
}

export default MantineWrapper
