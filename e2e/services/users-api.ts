import { type APIRequestContext, type APIResponse } from "@playwright/test";
import { ApiUrls } from "../constants/api-urls.js";

/** Shape of the payload accepted when creating a post. */
export interface NewPost {
  title: string;
  body: string;
  userId: number;
}

/**
 * Typed service wrapper over Playwright's request context for the
 * JSONPlaceholder API. This mirrors the Page Object Model for UI: tests call
 * semantic methods (`getUser`, `createPost`) and never issue raw
 * `request.get/post` calls, keeping endpoints in one place.
 */
export class UsersApi {
  constructor(private readonly request: APIRequestContext) {}

  /** GET a single user by id. */
  getUser(id: number): Promise<APIResponse> {
    return this.request.get(`${ApiUrls.JSON_PLACEHOLDER_BASE}/users/${id}`);
  }

  /** POST a new post and return the raw response. */
  createPost(data: NewPost): Promise<APIResponse> {
    return this.request.post(`${ApiUrls.JSON_PLACEHOLDER_BASE}/posts`, { data });
  }
}
