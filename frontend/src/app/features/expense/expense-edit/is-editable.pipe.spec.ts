import { IsEditablePipe } from "./is-editable.pipe";

describe("IsEditablePipe", () => {
  it("create an instance", () => {
    const pipe = new IsEditablePipe();
    expect(pipe).toBeTruthy();
  });
});
