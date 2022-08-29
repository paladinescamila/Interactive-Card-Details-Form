import React from 'react';
import './styles/App.scss';
import DesktopBackground from './assets/bg-main-desktop.png';
// import MobileBackground from './assets/bg-main-mobile.png';
import FrontCard from './components/FrontCard/FrontCard';
import BackCard from './components/BackCard/BackCard';
import Form from './components/Form/Form';

function App() {
	return (
		<>
			<img className='bg-main' src={DesktopBackground} alt='' aria-hidden />
			<section className='components'>
				<FrontCard />
				<BackCard />
				<Form />
			</section>
		</>
	);
}

export default App;
