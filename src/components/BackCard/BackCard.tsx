import React, {useContext} from 'react';
import DataContext from '../../context/DataContext';
import backgroundImage from './assets/bg-card-back.png';
import './BackCard.scss';

export default function BackCard() {
	// Card data
	const {cardCVC} = useContext(DataContext);

	// Default card data
	const cardCVCDefault = '000';

	return (
		<section className='back-card-container'>
			<div className='back-card-subcontainer'>
				<img className='back-card-bg' src={backgroundImage} alt='' aria-hidden />
				<div className='back-card-cvc'>{cardCVC !== '' ? cardCVC : cardCVCDefault}</div>
			</div>
		</section>
	);
}
