import React from 'react'
import {screen, render} from '@testing-library/react'
import "@testing-library/jest-dom"
import Home from '../../pages/index'

describe('Index page', () => {
    it("Should render properly", () => {
        render(<Home />);
        const header = screen.getByRole('heading', {level: 1});
        const headerText = 'getLinked';
        expect(header).toHaveTextContent(headerText)
    })
})