import React from 'react';
import './styles/App.scss';
import DataContext from './context/DataContext';
import DesktopBackground from './assets/bg-main-desktop.png';
import MobileBackground from './assets/bg-main-mobile.png';
import FrontCard from './components/FrontCard/FrontCard';
import BackCard from './components/BackCard/BackCard';
import Form from './components/Form/Form';

function App() {
	const {windowWidth} = React.useContext(DataContext);

	return (
		<>
			{windowWidth > 1000 ? (
				<img className='bg-main-desktop' src={DesktopBackground} alt='' aria-hidden />
			) : (
				<img className='bg-main-mobile' src={MobileBackground} alt='' aria-hidden />
			)}
			<section className='components'>
				<div className='cards'>
					<FrontCard />
					<BackCard />
				</div>
				<Form />
			</section>
		</>
	);
}

export default App;
