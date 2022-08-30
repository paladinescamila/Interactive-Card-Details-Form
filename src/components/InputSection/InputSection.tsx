import React, {useContext} from 'react';
import Input from '../Input/Input';
import settings from './assets/settings.json';
import DataContext from '../../context/DataContext';
import './InputSection.scss';

interface InputSectionProps {
	id: 'name' | 'number' | 'cvc';
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputSection(props: InputSectionProps) {
	// Component properties
	const {id, value, onChange} = props;

	// Input data
	const {label, type, placeholder} = settings[id];

	// Error handling
	const {inputsOK, inputsErrors} = useContext(DataContext);
	const isOK = inputsOK[id];
	const error = Array.from(inputsErrors[id])[0];

	return (
		<fieldset>
			<label>{label}</label>
			<Input type={type} placeholder={placeholder} value={value} onChange={onChange} isOK={isOK} />
			<p className='error-message'>{error}</p>
		</fieldset>
	);
}
