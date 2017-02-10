/* eslint-disable no-restricted-syntax */

import {
    expect
} from 'chai';
import createIndexCode from '../src/utilities/createIndexCode';
import codeExample from './codeExample';

describe('createIndexCode()', () => {
  it('describes no children', () => {
    const indexCode = createIndexCode([]);

    expect(indexCode).to.equal(codeExample(`
// @create-index
        `));
  });
  it('describes a single child', () => {
    const indexCode = createIndexCode(['foo']);

    expect(indexCode).to.equal(codeExample(`
// @create-index

export { default as foo } from './foo';
        `));
  });
  it('describes multiple children', () => {
    const indexCode = createIndexCode(['bar', 'foo']);

    expect(indexCode).to.equal(codeExample(`
// @create-index

export { default as bar } from './bar';
export { default as foo } from './foo';
        `));
  });
  context('file with extension', () => {
    it('removes the extension from the export statement', () => {
      const indexCode = createIndexCode(['foo.js']);

      expect(indexCode).to.equal(codeExample(`
// @create-index

export { default as foo } from './foo.js';
            `));
    });
  });
  context('file with multiple extensions', () => {
    it('removes all extensions from the export statement', () => {
      const indexCode = createIndexCode(['foo.foo.js']);

      expect(indexCode).to.equal(codeExample(`
// @create-index

export { default as foo } from './foo.foo.js';
            `));
    });
  }); 
  context('multiple, unsorted', () => {
    it('sorts the files', () => {
      const indexCode = createIndexCode(['foo', 'bar']);

      expect(indexCode).to.equal(codeExample(`
// @create-index

export { default as bar } from './bar';
export { default as foo } from './foo';
            `));
    });
  });
  context('file with dashes', () => {
    it('removes all dashes from the export statement', () => {
      const indexCode = createIndexCode(['--f-o-o--.js']);

      expect(indexCode).to.equal(codeExample(`
// @create-index

export { default as FOO } from './--f-o-o--.js';
            `));
    });
    it('translates characters after dashes to uppercase', () => {
      const indexCode = createIndexCode(['foo-BAR-baz.js']);
      
      expect(indexCode).to.equal(codeExample(`
// @create-index

export { default as fooBARBaz } from './foo-BAR-baz.js';
            `));
    });
  });
});
