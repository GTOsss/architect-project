import { createApi, createDomain, guard, sample } from 'effector';

const rootDomain = createDomain();

const { createStore, createEvent, createEffect } = rootDomain;

module.exports = { createStore, createEvent, createEffect, sample, createDomain, guard, createApi };
