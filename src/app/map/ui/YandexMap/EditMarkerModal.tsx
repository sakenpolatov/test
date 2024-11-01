import React from 'react'
import { useForm } from 'react-hook-form'
import { Modal, Button, TextInput, Textarea } from '@mantine/core'
import { IMarker } from '@@/types/types'

interface EditMarkerModalProps {
	opened: boolean
	onClose: () => void
	markerData: IMarker
	onSave: (data: IMarker) => void
}

const EditMarkerModal: React.FC<EditMarkerModalProps> = ({
	opened,
	onClose,
	markerData,
	onSave
}) => {
	const { register, handleSubmit } = useForm<IMarker>({
		defaultValues: markerData
	})

	const onSubmit = (data: IMarker) => {
		onSave(data)
		onClose()
	}

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			centered
			size='md'
			title='Редактировать метку'
			overlayProps={{ opacity: 0.6, blur: 4 }}
			withCloseButton
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-4 p-4'
			>
				<TextInput
					label='Тип'
					placeholder='Введите тип метки'
					{...register('type')}
					required
				/>
				<TextInput
					label='Адрес'
					placeholder='Введите адрес'
					{...register('address')}
					required
				/>
				<TextInput
					label='Источник информации'
					placeholder='Введите источник'
					{...register('label')}
					required
				/>
				<Textarea
					label='Описание'
					placeholder='Введите описание'
					{...register('description')}
					minRows={3}
					required
				/>
				<div className='flex justify-end gap-2 mt-4'>
					<Button onClick={onClose} variant='outline' color='gray'>
						Отмена
					</Button>
					<Button type='submit' color='blue'>
						Сохранить
					</Button>
				</div>
			</form>
		</Modal>
	)
}

export default EditMarkerModal
