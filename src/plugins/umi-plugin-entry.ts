import { enableES5 } from 'immer';

export default (api: any) => {
  api.addEntryCodeAhead(() => {
    enableES5();
    return `console.log('enableES5 works!')`;
  });
};
