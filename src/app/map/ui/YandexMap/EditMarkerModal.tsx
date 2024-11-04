import React from 'react'
import { useForm } from 'react-hook-form'
import { Modal, Button, TextInput, Textarea } from '@mantine/core'
import { EditMarkerModalProps, IMarker } from '@@/types/types'

const EditMarkerModal: React.FC<EditMarkerModalProps> = ({
	opened,
	onClose,
	markerData,
	onSave
}) => {
	const { register, handleSubmit } = useForm<IMarker>({
		defaultValues: markerData || {}
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
			size='sm'
			title='Редактировать метку'
			overlayProps={{ opacity: 0.6, blur: 4 }}
			withCloseButton
			styles={{
				content: {
					backgroundColor: '#f5f5f5',
					borderRadius: '8px'
				},
				header: {
					backgroundColor: '#007bff'
				},
				title: {
					color: '#333'
				},
				body: {
					padding: '20px'
				}
			}}
		>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
				<TextInput
					label='Тип'
					placeholder='Введите тип метки'
					{...register('type')}
					required
					styles={{
						label: { color: '#000' }
					}}
				/>
				<TextInput
					label='Адрес'
					placeholder='Введите адрес'
					{...register('address')}
					required
					styles={{
						label: { color: '#000' }
					}}
				/>
				<TextInput
					label='Источник информации'
					placeholder='Введите источник'
					{...register('label')}
					required
					styles={{
						label: { color: '#000' }
					}}
				/>
				<Textarea
					label='Описание'
					placeholder='Введите описание'
					{...register('description')}
					minRows={3}
					required
					styles={{
						label: { color: '#000' }
					}}
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
