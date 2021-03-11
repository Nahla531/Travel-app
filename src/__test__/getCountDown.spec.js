import { jest } from '@jest/globals';

import { getCountDown } from "../client/js/app"
describe("Testing the submit functionality", () => {
    test("Testing the getCountDown() function", () => {
        let date = '02/02/2222'
        expect(getCountDown(date)).toBeDefined();
    })
});