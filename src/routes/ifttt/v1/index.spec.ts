import * as Mocha from 'mocha';
import { expect } from 'chai';
import * as Supertest from 'supertest';

describe('Index routes', () => {
  it('should return hello world', () => {
    const result = 'Hello World!';
    expect(result).to.equal('Hello World!');
  });
});
