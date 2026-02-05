import { NotEmptyPipe } from "./not-empty-pipe";

describe("NotPipe", () => {
  it("create an instance", () => {
    const pipe = new NotEmptyPipe();
    expect(pipe).toBeTruthy();
  });
});
