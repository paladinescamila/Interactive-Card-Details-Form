import React, {useContext} from 'react';
import './FrontCard.scss';
import backgroundImage from './assets/bg-card-front.png';
import DataContext from './../context/DataContext';

export default function FrontCard() {
	// Card data
	const {cardNumber, cardName, cardMonthExp, cardYearExp} = useContext(DataContext);

	// Default card data
	const cardNumberDefault = '0000 0000 0000 0000';
	const cardNameDefault = 'JANE APPLESEED';
	const cardMonthExpDefault = '00';
	const cardYearExpDefault = '00';

	// Converts 1 digit to 2 digits if necessary
	const format = (n: number | string) => (Number(n) > 9 ? n : `0${Number(n)}`);

	return (
		<article className='front-card-container'>
			<img className='front-card-bg' src={backgroundImage} alt='' aria-hidden />
			<p className='front-card-number'>{cardNumber !== '' ? cardNumber : cardNumberDefault}</p>
			<p className='front-card-name'>{cardName !== '' ? cardName.toUpperCase() : cardNameDefault}</p>
			<p className='front-card-exp'>
				{cardMonthExp !== '' ? format(cardMonthExp) : cardMonthExpDefault}/{cardYearExp !== '' ? format(cardYearExp) : cardYearExpDefault}
			</p>
		</article>
	);
}
