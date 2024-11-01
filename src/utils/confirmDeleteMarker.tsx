import { modals } from '@mantine/modals'
import { Text } from '@mantine/core'

export const confirmDeleteMarker = (
	id: string,
	deleteMark: (id: string) => Promise<any>
) => {
	modals.openConfirmModal({
		title: (
			<Text style={{ color: '#000', fontWeight: 'bold' }}>
				Подтверждение удаления
			</Text>
		),
		children: (
			<Text size='sm' style={{ color: '#000' }}>
				Вы действительно хотите удалить метку?
			</Text>
		),
		labels: {
			confirm: (
				<span
					style={{
						color: '#fff',
						backgroundColor: '#007bff',
						padding: '8px 12px',
						borderRadius: '4px',
						display: 'inline-block',
						border: 'none'
					}}
				>
					Да
				</span>
			),
			cancel: (
				<span
					style={{
						color: '#050505',
						padding: '0',
						margin: '0',
						borderRadius: '4px',
						display: 'inline-block',
						border: 'none'
					}}
				>
					Нет
				</span>
			)
		},
		confirmProps: {
			style: { backgroundColor: '#007bff', color: '#fff', border: 'none' }
		},
		onCancel: () => console.log('Удаление отменено'),
		onConfirm: async () => {
			try {
				await deleteMark(id)
			} catch (error) {
				console.error('Ошибка при удалении метки:', error)
			}
		}
	})
}
