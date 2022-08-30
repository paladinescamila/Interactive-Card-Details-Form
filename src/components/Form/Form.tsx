import React, {useContext, useEffect, useState} from 'react';
import DataContext from '../../context/DataContext';
import IconComplete from './assets/icon-complete.svg';
import Input from '../Input/Input';
import './Form.scss';

export default function Form() {
	// Form inputs states
	const {cardName, setCardName} = useContext(DataContext);
	const {cardNumber, setCardNumber} = useContext(DataContext);
	const {cardMonthExp, setCardMonthExp} = useContext(DataContext);
	const {cardYearExp, setCardYearExp} = useContext(DataContext);
	const {cardCVC, setCardCVC} = useContext(DataContext);

	// Error handling
	const [showForm, setShowForm] = useState(true);
	const [validForm, setValidForm] = useState(false);
	const [submitError, setSubmitError] = useState('');

	type InputType = 'name' | 'number' | 'expMonth' | 'expYear' | 'cvc';
	type ErrorMap = {[key in InputType]: Set<string>};
	type CheckMap = {[key in InputType]: boolean};

	// Errors by input
	const [inputsErrors, setInputsErrors] = useState<ErrorMap>({
		name: new Set(),
		number: new Set(),
		expMonth: new Set(),
		expYear: new Set(),
		cvc: new Set(),
	});

	// If there is an error in the input
	const [inputsOK, setInputsOK] = useState<CheckMap>({
		name: true,
		number: true,
		expMonth: true,
		expYear: true,
		cvc: true,
	});

	// Update styles by input errors
	useEffect(() => {
		let currentInputsOK = {...inputsOK};
		let currentValidForm = true;

		Object.keys(inputsErrors).forEach((key) => {
			if (key === 'name' || key === 'number' || key === 'expMonth' || key === 'expYear' || key === 'cvc') {
				currentInputsOK[key] = inputsErrors[key].size === 0;
				if (!currentInputsOK[key]) currentValidForm = false;
			}
		});

		if (currentValidForm) setSubmitError('');

		setValidForm(currentValidForm);
		setInputsOK(currentInputsOK);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputsErrors]);

	// Add an error for a specific input
	const addError = (inputName: InputType, message: string) => {
		let labelErrors = inputsErrors[inputName];
		labelErrors.add(message);

		setInputsErrors({...inputsErrors, [inputName]: labelErrors});
	};

	// Remove an error for a specific input
	const removeError = (inputName: InputType, message: string) => {
		let labelErrors = inputsErrors[inputName];
		labelErrors.delete(message);

		setInputsErrors({...inputsErrors, [inputName]: labelErrors});
	};

	// Cardholder name change event
	const changeCardName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCardName(e.target.value);

		if (e.target.value.trim() === '') addError('name', "Can't be blank");
		else removeError('name', "Can't be blank");
	};

	// Card number change event
	const changeCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		let splitted = e.target.value.split(' ').join('').split('');
		let newValue = '';

		if (splitted.length === 17) return;

		for (let i = 0; i < splitted.length; i++) {
			if (i === 4 || i === 8 || i === 12) newValue += ' ';
			newValue += splitted[i];
		}

		setCardNumber(newValue);

		if (e.target.value.split(' ').join('') === '') addError('number', "Can't be blank");
		else removeError('number', "Can't be blank");

		if (e.target.value.split(' ').join('').length < 16) addError('number', 'Wrong format, 16 digits only');
		else removeError('number', 'Wrong format, 16 digits only');

		if (/^\d+$/.test(e.target.value.split(' ').join('')) === false) addError('number', 'Wrong format, numbers only');
		else removeError('number', 'Wrong format, numbers only');
	};

	// Card expiration month change event
	const changeCardMonthExp = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 2) return;
		setCardMonthExp(e.target.value);

		if (e.target.value.trim() === '') addError('expMonth', "Can't be blank");
		else removeError('expMonth', "Can't be blank");

		if (Number(e.target.value) < 1 || Number(e.target.value) > 12) addError('expMonth', 'Wrong format, 1-12 only');
		else removeError('expMonth', 'Wrong format, 1-12 only');
	};

	// Card expiration year change event
	const changeCardYearExp = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 2) return;
		setCardYearExp(e.target.value);

		if (e.target.value.trim() === '') addError('expYear', "Can't be blank");
		else removeError('expYear', "Can't be blank");

		if (Number(e.target.value) + 2000 < new Date().getFullYear()) addError('expYear', 'Wrong year, only future or present');
		else removeError('expYear', 'Wrong year, only future or present');
	};

	// Card CVC change event
	const changeCardCVC = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 3) return;
		setCardCVC(e.target.value);

		if (e.target.value.trim() === '') addError('cvc', "Can't be blank");
		else removeError('cvc', "Can't be blank");

		if (e.target.value.length < 3) addError('cvc', 'Wrong format, 3 digits only');
		else removeError('cvc', 'Wrong format, 3 digits only');
	};

	// Form submission
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validForm) return;

		const emptyName = cardName.trim() === '';
		const emptyNumber = cardNumber.trim() === '';
		const emptyExpMonth = cardMonthExp.trim() === '';
		const emptyExpYear = cardYearExp.trim() === '';
		const emptyCVC = cardCVC.trim() === '';

		if (emptyName || emptyNumber || emptyExpMonth || emptyExpYear || emptyCVC) {
			setSubmitError('Please fill in all fields');
			return;
		}

		setShowForm(false);
	};

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
		<>
			<form onSubmit={handleSubmit} className={`form-container ${showForm ? 'increase' : 'decrease'}`}>
				<fieldset className='form-name-container'>
					<label>CARDHOLDER NAME</label>
					<Input type='text' placeholder='e.g. Jane Appleseed' value={cardName} onChange={changeCardName} isOK={inputsOK.name} />
					<p className='error-message'>{Array.from(inputsErrors.name)[0]}</p>
				</fieldset>
				<fieldset className='form-number-container'>
					<label>CARD NUMBER</label>
					<Input type='text' placeholder='e.g. 1234 5678 9123 0000' value={cardNumber} onChange={changeCardNumber} isOK={inputsOK.number} />
					<p className='error-message'>{Array.from(inputsErrors.number)[0]}</p>
				</fieldset>
				<div className='form-exp-and-cvc'>
					<fieldset className='form-exp-container'>
						<label>EXP. DATE (MM/YY)</label>
						<div>
							<Input type='number' placeholder='MM' value={cardMonthExp} onChange={changeCardMonthExp} isOK={inputsOK.expMonth} />
							<Input type='number' placeholder='YY' value={cardYearExp} onChange={changeCardYearExp} isOK={inputsOK.expYear} />
						</div>
						<p className='error-message'>{[...Array.from(inputsErrors.expMonth), ...Array.from(inputsErrors.expYear)][0]}</p>
					</fieldset>
					<fieldset className='form-cvc-container'>
						<label>CVC</label>
						<Input type='number' placeholder='e.g. 123' value={cardCVC} onChange={changeCardCVC} isOK={inputsOK.cvc} />
						<p className='error-message'>{Array.from(inputsErrors.cvc)[0]}</p>
					</fieldset>
				</div>
				<input className='form-submit' type='submit' value='Confirm' />
				<p className='error-message-submit'>{submitError}</p>
			</form>

			<article className={`form-message ${showForm ? 'decrease' : 'increase'}`}>
				<img src={IconComplete} alt='' aria-hidden />
				<p>THAN YOU!</p>
				<p>We've added your card details</p>
				<button onClick={handleContinue}>Continue</button>
			</article>
		</>
	);
}
