'use strict';

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`[Bot] Logged in as ${client.user.tag} (${client.user.id})`);
    client.user.setActivity('Lamang Intelligence Network', { type: 3 }); // WATCHING
  },
};
