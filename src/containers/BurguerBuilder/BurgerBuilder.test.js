import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>)
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({ingredients: {salad: 1}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

    it('should not render  <BuildControls /> when does not receiving ingredients', () => {
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    });
});