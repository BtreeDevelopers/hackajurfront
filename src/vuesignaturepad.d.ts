declare module 'vue-signature-pad' {
    import { default as _Vue } from 'vue';
  
    export interface VueSignaturePad extends _Vue {
      width: string;
      height: string;
      saveType: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options: Record<string, any>;
      images: [];
      customStyle: CSSStyleDeclaration;
      saveSignature():
        | { isEmpty: true; data: undefined }
        | { isEmpty: false; data: string };
      undoSignature(): void;
      clearSignature(): void;
      // eslint-disable-next-line @typescript-eslint/ban-types
      mergeImagesAndSignature(signature: object | string): void;
      addImages(images: any[]): void;
      lockSignaturePad(): void;
      openSignaturePad(): void;
      getPropImagesAndCacheImages(): void;
      clearCacheImages(): void;
      fromDataURL(data: string): void;
      isEmpty(): boolean;
      toData(): string;
    }
  
    export function VueSignaturePad(Vue: typeof _Vue): void;
    export default VueSignaturePad;
  }