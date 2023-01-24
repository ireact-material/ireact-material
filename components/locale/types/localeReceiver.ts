import type { Locale } from '../index';

// 对应使用多语言组件的名称
export type LocaleComponentName = Exclude<keyof Locale, 'locale'>;

// 多语言props
export interface LocaleReceiverProps<C extends LocaleComponentName = LocaleComponentName> {
  // 组件名称
  componentName?: C;
  // 使用的语言
  defaultLocale?: Locale[C] | (() => Locale[C]);
  // 子组件
  children: (
    // 组件对应使用那些语言字段
    locale: NonNullable<Locale[C]>,
    // 组件语言
    localeCode: string,
    // 全局语言代码
    fullLocale: Locale,
  ) => React.ReactElement;
}
