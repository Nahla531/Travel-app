import { postData } from "../client/js/postdata"
test("Testing the weather function", () => {
    expect(typeof postData).toBe('function');
})