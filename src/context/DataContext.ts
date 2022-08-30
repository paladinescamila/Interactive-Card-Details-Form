import {createContext} from 'react';

type InputType = 'name' | 'number' | 'expMonth' | 'expYear' | 'cvc';
type ErrorMap = {[key in InputType]: Set<string>};
type CheckMap = {[key in InputType]: boolean};

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
	setCardCVC: (cardCVC: string) => void;
	showForm: boolean;
	setShowForm: (show: boolean) => void;
	windowWidth: number;
	setWindowWidth: (windowWidth: number) => void;
	inputsErrors: ErrorMap;
	setInputsErrors: (errors: ErrorMap) => void;
	inputsOK: CheckMap;
	setInputsOK: (checks: CheckMap) => void;
}

const DataContext = createContext<DataContextProps>({} as DataContextProps);
export default DataContext;

export {type InputType, type ErrorMap, type CheckMap};
