export const createTestLevelDto = (name: string) => {
  return { name };
};

export const generateTokenMock = (): string => {
  return 'mock-token';
};

export const validateResponseLevel = (response: any, expectedName: string) => {
  expect(response.body).toHaveProperty('name', expectedName);
};

export const expectLevelResponse = (response: any, name: string) => {
  expect(response.status).toBe(201);
  expect(response.body.name).toBe(name);
};
