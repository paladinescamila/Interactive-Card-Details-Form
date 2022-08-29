import React, {useState} from 'react';
import DataContext from './DataContext';

interface DataProviderProps {
	children: JSX.Element | JSX.Element[];
}

function DataProvider(props: DataProviderProps) {
	const [cardName, setCardName] = useState('');
	const [cardNumber, setCardNumber] = useState('');
	const [cardMonthExp, setCardMonthExp] = useState('');
	const [cardYearExp, setCardYearExp] = useState('');
	const [cardCVC, setCardCVC] = useState('');

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
			}}>
			{props.children}
		</DataContext.Provider>
	);
}

export default DataProvider;
