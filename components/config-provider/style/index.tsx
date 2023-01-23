import { useStyleRegister } from '@ant-design/cssinjs';
import { resetIcon } from '../../style';
import { useToken } from '../../theme/internal';

// 生成icon样式
const useStyle = (iconPrefixCls: string) => {
  const [theme, token] = useToken();

  // 为图标生成样式
  return useStyleRegister(
    {
      theme,
      token,
      hashId: '',
      path: ['ireact-material-icons', iconPrefixCls],
    },
    () => [
      {
        [`.${iconPrefixCls}`]: resetIcon(),
      },
    ],
  );
};

export default useStyle;
