import React, {useState} from 'react';
import DataContext, {ErrorMap} from './DataContext';

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

	// Error handling
	const [inputsErrors, setInputsErrors] = useState<ErrorMap>({
		name: new Set(),
		number: new Set(),
		expMonth: new Set(),
		expYear: new Set(),
		cvc: new Set(),
	});

	// Navigation and style
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [showForm, setShowForm] = useState(true);

	window.onresize = () => {
		setWindowWidth(window.innerWidth);
	};

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
				inputsErrors,
				setInputsErrors,
				showForm,
				setShowForm,
				windowWidth,
				setWindowWidth,
			}}>
			{props.children}
		</DataContext.Provider>
	);
}

export default DataProvider;
