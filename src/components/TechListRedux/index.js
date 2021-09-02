import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addTech } from '../../store/modules/techs/actions';


export default function TechListRedux() {
	const techs = useSelector(state => state.techs);

	const [newTech, setNewTech] = useState('');

	const dispatch = useDispatch();


	function handleAddTech() {
		dispatch(addTech(newTech));

		setNewTech('');
	}


	useEffect(() => {
		const techs = localStorage.getItem('techs');

		if (techs) {
			dispatch(addTech(JSON.parse(techs)));
		}
	}, []);


	useEffect(() => {
		localStorage.setItem('techs', JSON.stringify(techs));
	}, [techs]);


	return (
		<form data-testid='tech-form' onSubmit={handleAddTech}>
			<ul data-testid='tech-list'>
				{ techs.map(tech =>
					<li key={tech}>{ tech }</li>
				) }
			</ul>

			<label htmlFor='tech'>Tech</label>
			<input id='tech' value={newTech} onChange={e => setNewTech(e.target.value)} />

			<button onClick={handleAddTech}>Adicionar</button>
		</form>
	);
}