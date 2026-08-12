import {greet, hello} from '../src/index';

describe('index', () => {
  describe('hello', () => {
    it('Returns a hello message', () => {
      expect(hello()).toBe('Hello Apps Script!');
    });
  });

  describe('greet', () => {
    it('Greets by name', () => {
      expect(greet('Ada')).toBe('Hello, Ada!');
    });
  });
});
