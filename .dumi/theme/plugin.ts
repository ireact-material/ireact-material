import fs from 'fs';
import ReactTechStack from 'dumi/dist/techStacks/react';
import sylvanas from 'sylvanas';

// type
import type { IApi } from 'dumi';

// extends dumi internal tech stack, for customize previewer props
class AntdReactTechStack extends ReactTechStack {
  // 生成 demo 预览器的组件属性，在需要覆盖默认属性时使用
  generatePreviewerProps(...[props, opts]: any) {
    if (opts.type === 'external') {
      // 尝试查找与 demo tsx 文件同名的 md 文件
      const locale = opts.mdAbsPath.match(/index\.([a-z-]+)\.md$/i)?.[1];
      const mdPath = opts.fileAbsPath!.replace(/\.\w+$/, '.md');
      const md = fs.existsSync(mdPath) ? fs.readFileSync(mdPath, 'utf-8') : '';

      const codePath = opts.fileAbsPath!.replace(/\.\w+$/, '.tsx');
      const code = fs.existsSync(codePath) ? fs.readFileSync(codePath, 'utf-8') : '';

      // A tool to convert TypeScript to JavaScript with human-like code style
      props.jsx = sylvanas.parseText(code);

      // md文件
      if (md) {
        // 从 md 文件中提取描述和 css 样式
        const description = md.match(
          new RegExp(`(?:^|\\n)## ${locale}([^]+?)(\\n## [a-z]|\\n\`\`\`|\\n<style>|$)`),
        )?.[1];

        // style
        const style = md.match(/\n(?:```css|<style>)\n([^]+?)\n(?:```|<\/style>)/)?.[1];

        // 描述
        props.description ??= description?.trim();
        // 样式
        props.style ??= style;
      }
    }

    return props;
  }
}

const RoutesPlugin = (api: IApi) => {
  // 注册其他技术栈，用于扩展 Vue.js、小程序等技术栈的 demo 编译能力
  api.registerTechStack(() => new AntdReactTechStack());

  // 修改导出 HTML 文件
  api.modifyExportHTMLFiles((files) =>
    files
      // exclude dynamic route path, to avoid deploy failed by `:id` directory
      .filter((f) => !f.path.includes(':'))
      // workaround to make emotion support react 18 pipeableStream
      // ref: https://github.com/emotion-js/emotion/issues/2800#issuecomment-1221296308
      .map((file) => {
        let styles = '';

        // extract all emotion style tags from body
        file.content = file.content.replace(/<style data-emotion[\S\s]+?<\/style>/g, (s) => {
          styles += s;

          return '';
        });

        // insert emotion style tags to head
        file.content = file.content.replace('</head>', `${styles}</head>`);

        return file;
      }),
  );
};

export default RoutesPlugin;
