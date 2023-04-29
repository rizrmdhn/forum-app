import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { asyncPopulateUsersAndThreads } from "./action";
import myToast from "../../components/Toast";
import api from "../../utils/api";

const fakeErrorResponse = myToast.fire({
  icon: "error",
  title: "fake error",
});

describe("asyncPopulateUsersAndThreads thunk", () => {
  beforeEach(() => {
    api._getAllThreads = api.getAllThreads;
    api._getAllUsers = api.getAllUsers;
  });

  afterEach(() => {
    api.getAllThreads = api._getAllThreads;
    api.getAllUsers = api._getAllUsers;

    delete api._getAllThreads;
    delete api._getAllUsers;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    api.getAllUsers = () => Promise.resolve([]);
    api.getAllThreads = () => Promise.resolve([]);
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: "RECEIVE_USERS",
      payload: { users: [] },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "RECEIVE_THREADS",
      payload: { threads: [] },
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call alert correctly when data fetching failed", async () => {
    // arrange
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
