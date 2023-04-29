import { describe, it, expect } from "vitest";
import threadsReducer from "./reducer";

describe("threadsReducer", () => {
  it("should return the initial state", () => {
    // arrange
    const initialState = [];
    const action = { type: "UNKNOWN" };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should handle RECEIVE_THREADS", () => {
    // arrange
    const initialState = [];
    const action = {
      type: "RECEIVE_THREADS",
      payload: {
        threads: [
          {
            id: "1",
            title: "title 1",
            comments: [],
            upVotesBy: [],
            downVotesBy: [],
          },
          {
            id: "2",
            title: "title 2",
            comments: [],
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it("should handle CREATE_THREAD", () => {
    // arrange
    const initialState = [
      {
        id: "1",
        title: "title 1",
        comments: [],
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const action = {
      type: "CREATE_THREAD",
      payload: {
        threads: {
          id: "2",
          title: "title 2",
          comments: [],
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.threads, ...initialState]);
  });

  it("should handle UP_VOTE_THREAD", () => {
    // arrange
    const initialState = [
      {
        id: "1",
        title: "title 1",
        comments: [],
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const action = {
      type: "UP_VOTE_THREAD",
      payload: {
        threadId: "1",
        userId: "1",
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: initialState[0].upVotesBy.concat([action.payload.userId]),
      },
    ]);
  });

  it("should handle DOWN_VOTE_THREAD", () => {
    // arrange
    const initialState = [
      {
        id: "1",
        title: "title 1",
        comments: [],
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const action = {
      type: "DOWN_VOTE_THREAD",
      payload: {
        threadId: "1",
        userId: "1",
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: initialState[0].downVotesBy.concat([
          action.payload.userId,
        ]),
      },
    ]);
  });

  it("should handle NEUTRAL_VOTE_THREAD", () => {
    // arrange
    const initialState = [
      {
        id: "1",
        title: "title 1",
        comments: [],
        upVotesBy: ["1"],
        downVotesBy: [],
      },
    ];

    const action = {
      type: "NEUTRAL_VOTE_THREAD",
      payload: {
        threadId: "1",
        userId: "1",
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: initialState[0].upVotesBy.filter(
          (id) => id !== action.payload.userId
        ),
      },
    ]);
  });
});
