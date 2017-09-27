const builder = require('botbuilder')
const restify = require('restify')

// Setup Bot
const connector = new builder.ChatConnector()
const bot = new builder.UniversalBot(connector)

// Setup Restify
const server = restify.createServer()
server.listen(3978, () => {
  console.log('restify listening on port 3978')
})
server.post('/api/messages', connector.listen())

// Create Dialogs
bot.dialog('/', [
  (session, args, next) => {
    if (session.userData.name) {
      next()
    } else {
      session.beginDialog('/profile')
    }
  },
  (session, args, next) => {
    session.send(`Hello, ${session.userData.name}!`)
  }
])

bot.dialog('/profile', [
  (session, args, next) => {
    builder.Prompts.text(session, "Hello user, what's your name?")
  },
  (session, args, next) => {
    session.userData.name = args.response

    session.endDialog()
  }
])
