export const removeGuardFields = <T>(body: T, guardFields: string[]): Partial<T> => {
  for (const [k] of Object.entries(body)) {
    if (guardFields.includes(k)) delete body[k as keyof T];
  }
  return body;
};
