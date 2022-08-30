import React, {useContext} from 'react';
import './BackCard.scss';
import backgroundImage from './assets/bg-card-back.png';
import DataContext from './../context/DataContext';

export default function BackCard() {
	// Card data
	const {cardCVC} = useContext(DataContext);

	// Default card data
	const cardCVCDefault = '000';

	return (
		<article className='back-card-container'>
			<img className='back-card-bg' src={backgroundImage} alt='' aria-hidden />
			<div className='back-card-cvc'>{cardCVC !== '' ? cardCVC : cardCVCDefault}</div>
		</article>
	);
}
