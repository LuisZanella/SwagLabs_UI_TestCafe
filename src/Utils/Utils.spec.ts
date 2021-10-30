import { ClientFunction } from 'testcafe';

export const getClientLocation = ClientFunction(() => document.location.href);
