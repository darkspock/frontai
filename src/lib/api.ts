const MOCK_DELAY = 500;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type MockResponse<T = unknown> = { data: T };

const routes: Record<string, Record<string, (body?: unknown) => MockResponse>> = {
  POST: {
    '/auth/magic-link': () => ({
      data: { message: 'Magic link sent' },
    }),
    '/register': (body) => {
      const req = body as { name?: string } | undefined;
      return {
        data: {
          id: 'company-1',
          name: req?.name ?? 'New Company',
        },
      };
    },
  },
  GET: {
    '/auth/me': () => ({
      data: {
        id: 'user-1',
        email: 'admin@acme.com',
        name: 'Admin User',
        role: 'admin',
        company_id: 'company-1',
        is_active: true,
      },
    }),
  },
};

export const mockApi = {
  async post<T = unknown>(path: string, body?: unknown): Promise<MockResponse<T>> {
    await delay(MOCK_DELAY);
    const handler = routes.POST?.[path];
    if (!handler) throw new Error(`No mock handler for POST ${path}`);
    return handler(body) as MockResponse<T>;
  },

  async get<T = unknown>(path: string): Promise<MockResponse<T>> {
    await delay(MOCK_DELAY);
    const handler = routes.GET?.[path];
    if (!handler) throw new Error(`No mock handler for GET ${path}`);
    return handler() as MockResponse<T>;
  },
};
