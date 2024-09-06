import { describe, expect } from 'vitest'
import { get, shorten } from './url'

describe('shorten', test => {
  test('should give back the orginal url', async () => {
    const resp = await shorten({ url: 'http://example.com' })
    const url = await get({ id: resp.id })

    expect(url.url).toBe('http://example.com')
  })
})
