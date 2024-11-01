import React, { FC, memo } from 'react'
import { Placemark } from '@pbe/react-yandex-maps'
import { CustomPlacemarkProps } from '@@/types/types'

const areEqual = (
	prevProps: CustomPlacemarkProps,
	nextProps: CustomPlacemarkProps
) => {
	return (
		prevProps.marker._id === nextProps.marker._id &&
		prevProps.isHovered === nextProps.isHovered
	)
}

const CustomPlacemark: FC<CustomPlacemarkProps> = memo(
	({ marker, isHovered, onMouseEnter, onMouseLeave, onClick }) => {
		return (
			<Placemark
				key={marker._id}
				geometry={[marker.coordinates.latitude, marker.coordinates.longitude]}
				properties={{
					balloonContent: marker.label
				}}
				options={{
					iconLayout: 'default#image',
					iconImageHref: isHovered ? '/redmark.svg' : '/bluemark.svg',
					iconImageSize: [30, 30],
					iconImageOffset: [-15, -30]
				}}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onClick={() => onClick(marker.coordinates)}
			/>
		)
	},
	areEqual
)

export default CustomPlacemark
