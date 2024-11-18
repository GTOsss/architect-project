import { createEvent, restore } from 'effector';
import { SourceMapModuleConsistentRequiredFile } from '../types/sourceMapModuleConsistent';

export const setSourceMapAtom = createEvent<SourceMapModuleConsistentRequiredFile>();
export const $sourceMapAtom = restore<SourceMapModuleConsistentRequiredFile>(setSourceMapAtom, null);

export const setSourceMapModule = createEvent<SourceMapModuleConsistentRequiredFile>();
export const $sourceMapModule = restore<SourceMapModuleConsistentRequiredFile>(setSourceMapModule, null);
