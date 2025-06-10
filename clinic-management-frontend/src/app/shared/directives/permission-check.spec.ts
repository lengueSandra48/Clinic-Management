import { PermissionCheck } from './permission-check';

describe('PermissionCheck', () => {
  it('should create an instance', () => {
    const directive = new PermissionCheck();
    expect(directive).toBeTruthy();
  });
});
