import {createContext} from 'react';

interface DataContextProps {
	cardName: string;
	setCardName: (cardName: string) => void;
	cardNumber: string;
	setCardNumber: (cardNumber: string) => void;
	cardMonthExp: string;
	setCardMonthExp: (cardMonthExp: string) => void;
	cardYearExp: string;
	setCardYearExp: (cardYearExp: string) => void;
	cardCVC: string;
	setCardCVC: (cardCVV: string) => void;
}

const DataContext = createContext<DataContextProps>({} as DataContextProps);
export default DataContext;
