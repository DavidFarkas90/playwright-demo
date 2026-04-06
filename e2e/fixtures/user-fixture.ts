import { test as userFixture } from "@playwright/test";

type standard_user = {
  username: string;
  password: string;
};

const STANDARD_USER = userFixture.extend<standard_user>({
  username: "standard_user",
  password: "secret_sauce",
});

export const test = STANDARD_USER;
