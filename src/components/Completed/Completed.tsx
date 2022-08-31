import React, {useContext} from 'react';
import IconComplete from './assets/icon-complete.svg';
import DataContext from '../../context/DataContext';
import './Completed.scss';

export default function Completed() {
	const {showForm, setShowForm} = useContext(DataContext);
	const {setCardName, setCardNumber, setCardMonthExp, setCardYearExp, setCardCVC} = useContext(DataContext);

	// Form reset
	const handleContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setShowForm(true);

		setCardName('');
		setCardNumber('');
		setCardMonthExp('');
		setCardYearExp('');
		setCardCVC('');
	};

	return (
		<div className={`form-completed ${showForm ? 'decrease' : 'increase'}`}>
			<img src={IconComplete} alt='' aria-hidden />
			<p>THAN YOU!</p>
			<p>We've added your card details</p>
			<button onClick={handleContinue}>Continue</button>
		</div>
	);
}
