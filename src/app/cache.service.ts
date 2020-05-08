import { Injectable } from "@angular/core";

@Injectable()
export class CacheService {
  private cachedResources = new Map();

  constructor() {}

  has(key) {
    return this.cachedResources.has(key);
  }

  save(key, { data, expireIn }) {
    if (this.has(key)) return;

    const expiresAt = Date.now() + expireIn;
    this.cachedResources.set(key, JSON.stringify({ data, expiresAt }));
  }

  get(key) {
    if (!this.has(key)) return null;

    const { data, expiresAt } = JSON.parse(this.cachedResources.get(key));

    if (Date.now() > expiresAt) {
      this.destroy(key);
      return null;
    }
    return data;
  }

  destroy(key) {
    this.cachedResources.delete(key);
  }
}
