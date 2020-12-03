import { graphql } from 'graphql';
import { handler } from './index';
import gCall from './test-utils/gCall';

describe('test lambda a', () => {
  // test('successul', async ()=> {
  // 	const res = await handler({})

  // 	expect(res).toEqual({
  // 		statusCode: 200,
  // 		body: JSON.stringify({
  // 			success: true
  // 		})
  // 	})
  // })
  it('create user', () => {
    console.log(
      await gCall({
        source,
      })
    );
  });
});
