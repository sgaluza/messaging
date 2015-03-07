
class Space.messaging.Controller extends Space.Object

  Dependencies:
    eventBus: 'Space.messaging.EventBus'
    commandBus: 'Space.messaging.CommandBus'
    meteor: 'Meteor'
    utils: 'underscore'

  @ERRORS:
    unkownMessageType: "Message type unknown: "

  onDependenciesReady: ->

    for type, handler of @constructor._eventHandlers
      @eventBus.subscribeTo type, @_createBoundHandler(handler)

    for type, handler of @constructor._commandHandlers
      @commandBus.registerHandler type, @_createBoundHandler(handler)

  @handle: (messageType, handler) ->

    unless @_eventHandlers? then @_eventHandlers = {}
    unless @_commandHandlers? then @_commandHandlers = {}

    if messageType.__super__.constructor is Space.messaging.Event
      @_eventHandlers[messageType] = handler

    else if messageType.__super__.constructor is Space.messaging.Command
      @_commandHandlers[messageType] = handler

    else
      throw new Error @ERRORS.unkownMessageType + "<#{messageType}>"

  _createBoundHandler: (handler) ->
    boundHandler = {}
    # Create handlers that are bound to this controller instance
    for key, value of handler
      if typeof(value) is 'function'
        boundHandler[key] = @meteor.bindEnvironment @utils.bind(value, this)
      else
        boundHandler[key] = value
    return boundHandler
