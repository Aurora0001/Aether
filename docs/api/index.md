---
layout: api_doc
title: Plugin API Documentation - Aether
---

# API Documentation
Aether plugins provide a simple way to extend and tweak the behaviour of the
client without having to modify the core code. Almost any action that occurs
in the client can be hooked into and manipulated through plugins - only internal
state for each component is inaccessible to plugins.

Plugins for Aether are written in **Node v6 compatible JavaScript**. Some
features from ES6 and ES7 are unavailable in Aether plugins directly - instead,
you should use a transpiler such as Babel and distribute the ES5-compatible
code.

## Understanding Aether's Design
To understand how a plugin works, we must first understand how Aether is
structured, and how actions from the IRC connection eventually reach the user.

The answer to all of that is [Redux](http://redux.js.org/). For our purposes,
all we need to know is this:

- All data (channel lists, message lists, settings, etc.) is stored in one
  *store*. This store is held in memory and it is essentially a large 'plain old
  JavaScript object'.
- Data from the store is passed into the client UI through the `ClientPage`
  container.
- This data filters down into each component which displays a relevant part of
  the store.
- When the user changes the UI in some way (e.g. by clicking a button), or when
  the internal IRC connection receives a message, an *action* is created.
- The action **is passed into each plugin that is listening** for that
  particular event.
- This then goes to the *reducers* which change the data in the store.

This ASCII diagram may illustrate the point:

    ACTION ---> PLUGINS ---> REDUCERS ---> STORE ---> UI
     |                                                 |
     |--------------------<-----------------------------
     ^
    CLIENT CONNECTION

Plugins are allowed to change actions, delete them completely or trigger new
actions. There are also a few other things that plugins can do that don't fit
into the above cycle:

- Handle drag-and-drop events
- Manipulate the store.

Plugins can require any built-in Node.js module, such as `https`, `fs`, or
`net`. Libraries from `npm` must be bundled with your plugin.

## Getting Started
TODO.

## Metadata
TODO.

## Handling Drag and Drop
TODO.

## Hooks
TODO.
