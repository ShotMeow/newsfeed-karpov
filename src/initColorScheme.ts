import { applyScheme, getSavedScheme, getSystemScheme } from './assets/utils/colorSchemeUtils';

applyScheme(getSavedScheme() || getSystemScheme());
