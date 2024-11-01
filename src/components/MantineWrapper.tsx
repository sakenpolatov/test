'use client'

import { MantineProvider } from '@mantine/core'

const MantineWrapper: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	return <MantineProvider>{children}</MantineProvider>
}

export default MantineWrapper
