import React, {useContext} from 'react';
import './BackCard.scss';
import backgroundImage from './assets/bg-card-back.png';
import DataContext from './../context/DataContext';

export default function BackCard() {
	const {cardCVC} = useContext(DataContext);
	const defaultCVC = '000';

	return (
		<article className='back-card-container'>
			<img className='back-card-bg' src={backgroundImage} alt='' aria-hidden />
			<div className='back-card-cvc'>{cardCVC !== '' ? cardCVC : defaultCVC}</div>
		</article>
	);
}
