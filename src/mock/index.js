import { chats, getUserInfo } from "./chat.js";
import API from "../constants/api";

const mocks = {
  [API.messageBoard.setUserNames]: getUserInfo,
  [API.messageBoard.getAllChats]: chats,
};

export const getMockError = (config) => {
  const mockError = new Error();
  if (mocks[config.url] instanceof Function) {
    mockError.mockData = mocks[config.url](config);
  } else {
    mockError.mockData = mocks[config.url];
  }
  mockError.config = config;
  return Promise.reject(mockError);
};

export const isMockError = (error) => Boolean(error.mockData);

export const getMockResponse = (mockError) => {
  const { mockData, config } = mockError;
  if (mockData.status && String(mockData.status)[0] === "5") {
    const err = new Error(mockData.message || "mock error");
    err.code = mockData.status;
    return Promise.reject(err);
  }

  return Promise.resolve(
    Object.assign(
      {
        data: {},
        status: mockData.status,
        statusText: "OK",
        headers: {},
        config,
        isMock: true,
      },
      mockData
    )
  );
};
