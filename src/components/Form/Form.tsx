import React, {useContext, useEffect, useState} from 'react';
import DataContext, {InputType} from '../../context/DataContext';
import InputSection from '../InputSection/InputSection';
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
	const [validForm, setValidForm] = useState(false);
	const [submitError, setSubmitError] = useState('');
	const {inputsErrors, setInputsErrors} = useContext(DataContext);

	// Error messages
	const isEmpty = "Can't be blank";
	const lessThan16Digits = 'Wrong format, 16 digits only';
	const notNumbers = 'Wrong format, numbers only';
	const notMonthRange = 'Wrong format, 1-12 only';
	const pastYear = 'Wrong year, only future or present';
	const lessThan3Digits = 'Wrong format, 3 digits only';

	// Update styles by input errors
	useEffect(() => {
		let currentValidForm = true;

		Object.keys(inputsErrors).forEach((key) => {
			if (key === 'name' || key === 'number' || key === 'expMonth' || key === 'expYear' || key === 'cvc') {
				if (inputsErrors[key].size > 0) currentValidForm = false;
			}
		});

		if (currentValidForm) setSubmitError('');

		setValidForm(currentValidForm);

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

		if (e.target.value.trim() === '') addError('name', isEmpty);
		else removeError('name', isEmpty);
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

		if (e.target.value.split(' ').join('') === '') addError('number', isEmpty);
		else removeError('number', isEmpty);

		if (e.target.value.split(' ').join('').length < 16) addError('number', lessThan16Digits);
		else removeError('number', lessThan16Digits);

		if (/^\d+$/.test(e.target.value.split(' ').join('')) === false) addError('number', notNumbers);
		else removeError('number', notNumbers);
	};

	// Card expiration month change event
	const changeCardMonthExp = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 2) return;
		setCardMonthExp(e.target.value);

		if (e.target.value.trim() === '') addError('expMonth', isEmpty);
		else removeError('expMonth', isEmpty);

		if (Number(e.target.value) < 1 || Number(e.target.value) > 12) addError('expMonth', notMonthRange);
		else removeError('expMonth', notMonthRange);
	};

	// Card expiration year change event
	const changeCardYearExp = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 2) return;
		setCardYearExp(e.target.value);

		if (e.target.value.trim() === '') addError('expYear', isEmpty);
		else removeError('expYear', isEmpty);

		if (Number(e.target.value) + 2000 < new Date().getFullYear()) addError('expYear', pastYear);
		else removeError('expYear', pastYear);
	};

	// Card CVC change event
	const changeCardCVC = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 3) return;
		setCardCVC(e.target.value);

		if (e.target.value.trim() === '') addError('cvc', isEmpty);
		else removeError('cvc', isEmpty);

		if (e.target.value.length < 3) addError('cvc', lessThan3Digits);
		else removeError('cvc', lessThan3Digits);
	};

	// Form submission
	const {showForm, setShowForm} = useContext(DataContext);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Check if the fields are not correct

		if (!validForm) {
			setSubmitError('Please correct the fields');
			return;
		}

		// Check if the fields are empty

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

	return (
		<>
			<form onSubmit={handleSubmit} className={`form-container ${showForm ? 'increase' : 'decrease'}`}>
				<InputSection id='name' value={cardName} onChange={changeCardName} />
				<InputSection id='number' value={cardNumber} onChange={changeCardNumber} />
				<div className='form-exp-and-cvc'>
					<fieldset className='form-exp-container'>
						<label>EXP. DATE (MM/YY)</label>
						<div>
							<Input
								type='number'
								placeholder='MM'
								value={cardMonthExp}
								onChange={changeCardMonthExp}
								isOK={inputsErrors.expMonth.size === 0}
							/>
							<Input
								type='number'
								placeholder='YY'
								value={cardYearExp}
								onChange={changeCardYearExp}
								isOK={inputsErrors.expYear.size === 0}
							/>
						</div>
						<p className='error-message'>{[...Array.from(inputsErrors.expMonth), ...Array.from(inputsErrors.expYear)][0]}</p>
					</fieldset>
					<InputSection id='cvc' value={cardCVC} onChange={changeCardCVC} />
				</div>
				<input className='form-submit' type='submit' value='Confirm' />
				<p className='error-message-submit'>{submitError}</p>
			</form>
		</>
	);
}
