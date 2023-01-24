import Col from './col';
import useInternalBreakpoint from './hooks/useBreakpoint';
import Row from './row';

export { Row, Col };

// 使用 useBreakpoint Hook 个性化布局
function useBreakpoint() {
  return useInternalBreakpoint();
}

export default { useBreakpoint };
