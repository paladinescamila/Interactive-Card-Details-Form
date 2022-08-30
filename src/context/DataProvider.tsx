import React, {useState} from 'react';
import DataContext, {ErrorMap, CheckMap} from './DataContext';

interface DataProviderProps {
	children: JSX.Element | JSX.Element[];
}

function DataProvider(props: DataProviderProps) {
	// Card data
	const [cardName, setCardName] = useState('');
	const [cardNumber, setCardNumber] = useState('');
	const [cardMonthExp, setCardMonthExp] = useState('');
	const [cardYearExp, setCardYearExp] = useState('');
	const [cardCVC, setCardCVC] = useState('');

	// Navigation and style
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [showForm, setShowForm] = useState(true);

	window.onresize = () => {
		setWindowWidth(window.innerWidth);
	};

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

	return (
		<DataContext.Provider
			value={{
				cardName,
				setCardName,
				cardNumber,
				setCardNumber,
				cardMonthExp,
				setCardMonthExp,
				cardYearExp,
				setCardYearExp,
				cardCVC,
				setCardCVC,
				showForm,
				setShowForm,
				windowWidth,
				setWindowWidth,
				inputsErrors,
				setInputsErrors,
				inputsOK,
				setInputsOK,
			}}>
			{props.children}
		</DataContext.Provider>
	);
}

export default DataProvider;
