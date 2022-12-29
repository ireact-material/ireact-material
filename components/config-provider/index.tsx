import * as React from "react";
import useMemo from "rc-util/lib/hooks/useMemo";

import type { ConfigConsumerProps, Theme } from "./context";

import { ConfigContext, ConfigConsumer, defaultIconPrefixCls } from "./context";
import SizeContext from "./size-context";

export { ConfigContext, ConfigConsumerProps };

// export interface ConfigProviderProps {
//   prefixCls?: string;
//   children?: React.ReactNode;
//   iconPrefixCls?: string;
// }

// interface ProviderChildrenProps extends ConfigProviderProps {
//   parentContext: ConfigConsumerProps;
// }

// let globalPrefixCls: string;
// let globalIconPrefixCls: string;

// export const defaultPrefixCls = 'ireact';

// function getGlobalPrefixCls() {
//   return globalPrefixCls || defaultPrefixCls;
// }

// function getGlobalIconPrefixCls() {
//   return globalIconPrefixCls || defaultIconPrefixCls;
// }

// // 设置全局配置
// const setGlobalConfig = ({
//   prefixCls,
//   iconPrefixCls,
// }: Pick<ConfigProviderProps, 'prefixCls' | 'iconPrefixCls'> & { theme?: Theme }) => {
//   if (prefixCls !== undefined) {
//     globalPrefixCls = prefixCls;
//   }
//   if (iconPrefixCls !== undefined) {
//     globalIconPrefixCls = iconPrefixCls;
//   }
// };

// export const globalConfig = () => ({
//   getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
//     if (customizePrefixCls) return customizePrefixCls;
//     return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
//   },
//   getIconPrefixCls: getGlobalIconPrefixCls,
//   getRootPrefixCls: () => {
//     // If Global prefixCls provided, use this
//     if (globalPrefixCls) {
//       return globalPrefixCls;
//     }

//     // Fallback to default prefixCls
//     return getGlobalPrefixCls();
//   },
// });

// const ProviderChildren: React.FC<ProviderChildrenProps> = (props) => {
//   const {
//     children,
//     parentContext,
//   } = props;

//   // 子节点
//   const childNode =  children;

//   const config = {
//     ...parentContext,
//   };

//   // 防止所有props重新渲染
//   const memoedConfig = useMemo(
//     () => config,
//     config,
//     (prevConfig, currentConfig) => {
//       const prevKeys = Object.keys(prevConfig) as Array<keyof typeof config>;
//       const currentKeys = Object.keys(currentConfig) as Array<keyof typeof config>;
//       return (
//         prevKeys.length !== currentKeys.length ||
//         prevKeys.some((key) => prevConfig[key] !== currentConfig[key])
//       );
//     },
//   );

//   return <ConfigContext.Provider value={memoedConfig}>{childNode}</ConfigContext.Provider>;
// }

// const ConfigProvider: React.FC<ConfigProviderProps> & {
//   /** @private internal Usage. do not use in your production */
//   ConfigContext: typeof ConfigContext;
//   SizeContext: typeof SizeContext;
//   config: typeof setGlobalConfig;
// } = (props) => (
//   <ConfigConsumer>
//     {(context) => (
//       <ProviderChildren parentContext={context} {...props} />
//     )}
//   </ConfigConsumer>
// );

// ConfigProvider.ConfigContext = ConfigContext;
// ConfigProvider.SizeContext = SizeContext;
// ConfigProvider.config = setGlobalConfig;

// export default ConfigProvider;
