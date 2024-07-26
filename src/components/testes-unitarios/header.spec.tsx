import { render } from "@testing-library/react";
import { Header } from "../Header";

describe('Header Component', () => {
    it('should display the header and yours contents success', () => {
        // teste aqui
        const wrapper = render(<Header />)
        expect(wrapper.getByRole('img')).toBeTruthy();
        expect(wrapper.getByTitle('Logo'))
    })
})