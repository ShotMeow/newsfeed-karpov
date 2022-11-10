import { RefObject } from 'react';

export type InputName = 'company-name' | 'title' | 'text' | 'description' | 'image';

export type InputValues = {
  [key in InputName]: string;
};

export type InputErrors = {
  [key in InputName]: string;
};

export type InputRefs = {
  [key in InputName]: RefObject<any>;
};
