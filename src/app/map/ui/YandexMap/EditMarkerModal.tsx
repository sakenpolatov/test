import React from 'react'
import { Modal, Button, TextInput, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

interface EditMarkerModalProps {
	opened: boolean
	onClose: () => void
	markerData: {
		address: string
		label: string
		description: string
		type: string
	}
	onSave: (updatedData: any) => void
}

const EditMarkerModal: React.FC<EditMarkerModalProps> = ({
	opened,
	onClose,
	markerData,
	onSave
}) => {
	const [address, setAddress] = React.useState(markerData.address)
	const [label, setLabel] = React.useState(markerData.label)
	const [description, setDescription] = React.useState(markerData.description)
	const [type, setType] = React.useState(markerData.type)

	const handleSave = () => {
		onSave({ address, label, description, type })
		onClose()
	}

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title='Редактировать метку'
			centered
		>
			<TextInput
				label='Адрес'
				placeholder='Введите адрес'
				value={address}
				onChange={e => setAddress(e.currentTarget.value)}
			/>
			<TextInput
				label='Источник информации'
				placeholder='Введите источник'
				value={label}
				onChange={e => setLabel(e.currentTarget.value)}
				mt='md'
			/>
			<TextInput
				label='Описание'
				placeholder='Введите описание'
				value={description}
				onChange={e => setDescription(e.currentTarget.value)}
				mt='md'
			/>
			<TextInput
				label='Тип'
				placeholder='Введите тип метки'
				value={type}
				onChange={e => setType(e.currentTarget.value)}
				mt='md'
			/>
			<Group justify='flex-end' mt='md'>
				<Button onClick={onClose} variant='default'>
					Отмена
				</Button>
				<Button onClick={handleSave}>Сохранить</Button>
			</Group>
		</Modal>
	)
}

export default EditMarkerModal
