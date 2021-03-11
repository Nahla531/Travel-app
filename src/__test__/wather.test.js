import { handlefunc } from "../client/js/app"
describe("Testing the handlefunc if it is function", () => {
    test("Testing the getCountDown() function", () => {
        expect(typeof handlefunc).toBe('function');
    })
});