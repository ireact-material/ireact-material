import * as React from 'react';
import defaultLocaleData from '../locale/en_US';
import LocaleContext from './context';

// types
import type {
  LocaleComponentName,
  // 多语言props
  LocaleReceiverProps,
} from './types/localeReceiver';

// 当前加载的语言环境
import type { Locale } from './index';
import type { LocaleContextProps } from './types/context';

// 加载对应的语言
const LocaleReceiver = <C extends LocaleComponentName = LocaleComponentName>(
  props: LocaleReceiverProps<C>,
) => {
  const {
    // 组件名称
    componentName = 'global' as C,
    // 使用的语言
    defaultLocale,
    // 子组件
    children,
  } = props;

  // 当前加载的语言环境
  const currentLocale = React.useContext<LocaleContextProps | undefined>(LocaleContext);

  // 获取使用的语言代码
  // 某个依赖项改变时才重新计算
  // useMemo 调用您的函数并缓存其结果
  const getLocale = React.useMemo<NonNullable<Locale[C]>>(
    () => {
      // 如果没有设置默认语言 使用英文
      const locale = defaultLocale || defaultLocaleData[componentName];

      // 获取组件对应使用的语言内容
      const localeFromContext = currentLocale?.[componentName] ?? {};

      return {
        ...(locale instanceof Function ? locale() : locale),
        ...(localeFromContext || {}),
      };
    },
    // 依赖计算值
    [componentName, defaultLocale, currentLocale],
  );

  // 获取对应的语言环境
  // useMemo 调用您的函数并缓存其结果
  const getLocaleCode = React.useMemo<string>(() => {
    const localeCode = currentLocale && currentLocale.locale;

    // 使用了 LocaleProvide 但没有设置语言环境 使用英文
    if (currentLocale && currentLocale.exist && !localeCode) {
      return defaultLocaleData.locale;
    }

    return localeCode!;
  }, [currentLocale]);

  return children(getLocale, getLocaleCode, currentLocale!);
};

export default LocaleReceiver;
