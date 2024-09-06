/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { api, APIError } from 'encore.dev/api'
import { SQLDatabase } from 'encore.dev/storage/sqldb'
import { randomBytes } from 'node:crypto'

interface URL {
  id: string // short-form URL id
  url: string // complete URL, in long form
}

interface ShortenParams {
  url: string // the URL to shorten
}

const db = new SQLDatabase('url', { migrations: './migrations' })

/*
 * Shortens a URL.
 */
export const shorten = api(
  {
    method: 'POST',
    path: '/url',
    expose: true,
  },
  async ({ url }: ShortenParams): Promise<URL> => {
    const id = randomBytes(6).toString('base64url')
    await db.exec`
    INSERT INTO url (id, original_url)
    VALUES (${id}, ${url})
`
    return { id, url }
  },
)

/*
 * Retrieves a URL.
 */
export const get = api(
  {
    method: 'GET',
    expose: true,
    path: '/url/:id',
  },
  async ({ id }: { id: string }): Promise<URL> => {
    const row = await db.queryRow`
    SELECT original_url FROM url WHERE id = ${id}
`
    if (!row) {
      throw APIError.notFound(`url not found for ${id}`)
    }
    return { id, url: row.original_url }
  },
)
