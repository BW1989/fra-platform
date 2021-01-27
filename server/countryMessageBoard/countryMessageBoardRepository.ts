// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'camelize'.
const camelize = require('camelize')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'persistMes... Remove this comment to see the full error message
const persistMessage = async (client: any, countryIso: any, message: any, fromUserId: any) => {
  await client.query(
    `
      INSERT INTO country_message_board_message (country_iso, text, from_user)
      VALUES ($1, $2, $3)
    `,
    [countryIso, message, fromUserId]
  )
}

const markMessagesRead = async (client: any, userId: any, messages: any) =>
  messages.forEach(
    async (msg: any) =>
      await client.query(
        `
      INSERT INTO country_message_board_message_read (message_id, user_id)
      VALUES ($1, $2)
    `,
        [msg.id, userId]
      )
  )

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fetchCount... Remove this comment to see the full error message
const fetchCountryMessages = async (client: any, countryIso: any, userId: any) => {
  // marking unread messages as read
  const unreadMessages = await fetchCountryUnreadMessages(client, countryIso, userId)
  await markMessagesRead(client, userId, unreadMessages)

  // fetching all messages
  const messagesResp = await client.query(
    `
    SELECT m.id,
           m.country_iso,
           m.text,
           to_char(m.time, 'YYYY-MM-DD"T"HH24:MI:ssZ') as time,
           u.id                                        as from_user_id,
           u.name                                      as from_user_name
    FROM country_message_board_message m
           JOIN fra_user u ON m.from_user = u.id
    WHERE m.country_iso = $1
    ORDER BY m.time
  `,
    [countryIso]
  )

  return camelize(messagesResp.rows)
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fetchCount... Remove this comment to see the full error message
const fetchCountryUnreadMessages = async (client: any, countryIso: any, userId: any, markAsRead = false) => {
  const messagesResp = await client.query(
    `
    SELECT m.id,
           m.country_iso,
           m.text,
           to_char(m.time, 'YYYY-MM-DD"T"HH24:MI:ssZ') as time,
           u.id                                        as from_user_id,
           u.name                                      as from_user_name
    FROM country_message_board_message m
           JOIN fra_user u ON m.from_user = u.id
    WHERE m.country_iso = $1
      AND m.from_user != $2
      AND m.id NOT IN (SELECT mr.message_id FROM country_message_board_message_read mr WHERE mr.user_id = $2)
    ORDER BY m.time
  `,
    [countryIso, userId]
  )

  const messages = camelize(messagesResp.rows)

  if (markAsRead) await markMessagesRead(client, userId, messages)

  return messages
}

module.exports = {
  persistMessage,
  fetchCountryMessages,
  fetchCountryUnreadMessages,
}
