export abstract class DataService<T extends { id: string }> {
  protected abstract storageKey: string;

  async getAll(): Promise<T[]> {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.storageKey);
    return data ? (JSON.parse(data) as T[]) : [];
  }

  async getById(id: string): Promise<T | null> {
    const items = await this.getAll();
    return items.find((i) => i.id === id) || null;
  }

  async create(item: T): Promise<T> {
    const items = await this.getAll();
    items.push(item);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    return item;
  }

  async update(id: string, item: Partial<T>): Promise<T> {
    const items = await this.getAll();
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) throw new Error('Item not found');
    items[index] = { ...items[index], ...item };
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    return items[index];
  }

  async delete(id: string): Promise<void> {
    const items = await this.getAll();
    const filtered = items.filter((i) => i.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filtered));
  }
}
