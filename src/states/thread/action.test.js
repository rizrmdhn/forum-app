import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { asyncCreateThread } from "./action";
import api from "../../utils/api";

const fakeCreateThreadResponse = {
  title: "title 1",
  body: "body 1",
  category: "category 1",
};

describe("asyncCreateThread thunk", () => {
  beforeEach(() => {
    api._getAllThreads = api.getAllThreads;
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.getAllThreads = api._getAllThreads;
    api.createThread = api._createThread;

    delete api._getAllThreads;
    delete api._createThread;
  });

  it("should dispatch createThreadActionCreator when api.getAllThreads is successful", async () => {
    // arrange
    api.createThread = () => Promise.resolve(fakeCreateThreadResponse);
    const dispatch = vi.fn();

    // action
    await asyncCreateThread(fakeCreateThreadResponse)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: "CREATE_THREAD",
      payload: { threads: fakeCreateThreadResponse },
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch createThreadActionCreator when api.getAllThreads is successful", async () => {
    // arrange
    api.createThread = () => Promise.resolve(fakeCreateThreadResponse);
    const dispatch = vi.fn();

    // action
    await asyncCreateThread(fakeCreateThreadResponse)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: "CREATE_THREAD",
      payload: { threads: fakeCreateThreadResponse },
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
