import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';

import { addTech } from '~/store/modules/techs/actions';
import TechListRedux from '~/components/TechListRedux';


jest.mock('react-redux');


describe('TechListRedux component', () => {
	beforeEach(() => {
		useSelector.mockImplementation(cb => cb({
			techs: ['Node.js', 'React.js']
		}));

		localStorage.clear();
	});


	it('should render tech list', () => {
		const { getByTestId, getByText, debug } = render(<TechListRedux />);

		//debug();

		expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
		expect(getByTestId('tech-list')).toContainElement(getByText('React.js'));
	});


	it('should be able to add new tech', () => {
		const { getByTestId, getByLabelText } = render(<TechListRedux />);

		const dispatch = jest.fn();

		useDispatch.mockReturnValue(dispatch);

		fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
		fireEvent.submit(getByTestId('tech-form'));

		expect(dispatch).toHaveBeenCalledWith(addTech('Node.js'));
	});
});