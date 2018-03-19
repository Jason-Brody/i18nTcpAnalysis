import { FileStatusPipe } from './file-status.pipe';

describe('FileStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new FileStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
