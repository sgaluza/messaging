Package.describe({
  summary: 'Messaging infrastructure for Space applications.',
  name: 'space:messaging',
  version: '1.8.0',
  git: 'https://github.com/meteor-space/messaging.git',
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'coffeescript',
    'underscore',
    'check',
    'ejson',
    'fongandrew:find-and-modify@0.2.1',
    'space:base@2.5.1'
  ]);

  api.addFiles([
    'source/module.coffee',
    'source/serializable.coffee',
    'source/helpers.coffee',
    'source/event.coffee',
    'source/event_bus.coffee',
    'source/command.coffee',
    'source/command_bus.coffee',
    'source/controller.coffee',
    'source/tracker.coffee',
    'source/publication.coffee',
    'source/api.coffee',
    'source/application_helpers.coffee',
    'source/value-objects/guid.coffee'
  ]);

});

Package.onTest(function(api) {

  api.use([
    'coffeescript',
    'underscore',
    'check',
    'ejson',
    'mongo',
    'underscore',
    'space:messaging',
    'practicalmeteor:munit@2.1.4',
    'space:testing@1.3.0'
  ]);

  api.addFiles([
    'tests/unit/serializable.unit.coffee',
    'tests/unit/event.unit.coffee',
    'tests/unit/event_bus.unit.coffee',
    'tests/unit/command_bus.unit.coffee',
    'tests/unit/api.unit.coffee',
    'tests/unit/value-objects/guid.unit.coffee',
    'tests/integration/controller_event_handling.js',
    'tests/integration/controller_command_handling.js',
    'tests/integration/test_app.coffee',
  ]);

  api.addFiles([
    'tests/integration/distributed_messaging.coffee',
  ], 'server');

});
