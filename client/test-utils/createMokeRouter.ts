// test-utils/createMockRouter.ts
import { NextRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

export function createMockRouter(router: Partial<NextRouter> = {}): NextRouter {
  return {
    basePath: "",
    pathname: "/",
    route: "/",
    asPath: "/",
    query: {} as ParsedUrlQuery,
    push: jest.fn().mockResolvedValue(true),  // Proper return value for push
    replace: jest.fn().mockResolvedValue(true),  // Proper return value for replace
    reload: jest.fn(),  // No return value needed for reload
    back: jest.fn(),  // No return value needed for back
    forward: jest.fn(), // Mock the forward function
    prefetch: jest.fn().mockResolvedValue(undefined),  // Prefetch needs a promise return
    beforePopState: jest.fn(),  // No return value needed for beforePopState
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,  // Default value for isLocaleDomain
    isReady: true,
    isPreview: false,
    ...router,  // Spread operator to override with provided values
  };
}
