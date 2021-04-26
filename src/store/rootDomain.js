const { sample, createDomain, guard, createApi } = require('effector');

const rootDomain = createDomain();

const { createStore, createEvent, createEffect } = rootDomain;

module.exports = { createStore, createEvent, createEffect, sample, createDomain, guard, createApi };
