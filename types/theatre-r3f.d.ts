declare module '@theatre/r3f' {
  export const SheetProvider: any;
  export const useCurrentSheet: any;
  export const OrthographicCamera: any;
  export const PerspectiveCamera: any;
  export const RefreshSnapshot: any;
  export const editable: any;
  export default any;
}

declare module '@theatre/r3f/dist/extension' {
  import type { IExtension } from '@theatre/studio';
  declare const r3fExtension: IExtension;
  export default r3fExtension;
}
