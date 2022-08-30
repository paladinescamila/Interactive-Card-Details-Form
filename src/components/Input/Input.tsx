import React, {useRef, useEffect} from 'react';
import './Input.scss';

interface InputProps {
	type: string;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isOK: boolean;
}

export default function Input(props: InputProps) {
	// Component data
	const {type, placeholder, value, onChange, isOK} = props;

	// Border style (container background)
	const focusBackgroud = 'linear-gradient(90deg, rgba(99, 71, 255, 1) 0%, rgba(96, 5, 148, 1) 100%)';
	const blurBackgroud = 'hsl(270, 3%, 87%)';
	const errorBackgroud = 'hsl(0, 100%, 66%)';

	const [background, setBackground] = React.useState(blurBackgroud);
	const inputRef = useRef<HTMLInputElement>(null);

	const inputFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBackground(focusBackgroud);
	};

	const inputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBackground(blurBackgroud);
	};

	// Update styles by input status
	useEffect(() => {
		if (isOK) setBackground(inputRef.current === document.activeElement ? focusBackgroud : blurBackgroud);
		else setBackground(errorBackgroud);
	}, [isOK]);

	return (
		<div className='input-container' style={{background: background}}>
			<input type={type} placeholder={placeholder} value={value} onChange={onChange} onFocus={inputFocus} onBlur={inputBlur} ref={inputRef} />
		</div>
	);
}
