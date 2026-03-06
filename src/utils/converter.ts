import { marked } from 'marked';

// 生成唯一的 lake-id（短格式，类似语雀）
function generateLakeId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 7; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

/**
 * 转义 HTML 特殊字符
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * URL 编码（用于 card 的 value 属性）
 */
function encodeURIComponent(data: string): string {
  return data
    .replace(/'/g, '%27')
    .replace(/"/g, '%22')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .replace(/&/g, '%26')
    .replace(/\n/g, '%5Cn')
    .replace(/\r/g, '')
    .replace(/ /g, '%20');
}

/**
 * 创建带 span 包裹的文本
 * 语雀 Lake 格式要求所有文本内容都用 <span data-lake-id="xxx"> 包裹
 */
function createSpan(text: string): string {
  const id = generateLakeId();
  return `<span data-lake-id="${id}">${text}</span>`;
}

/**
 * 处理行内元素（递归处理 tokens 数组）
 * 关键：所有文本输出都必须用 <span> 包裹
 */
function processInlineTokens(tokens: any[]): string {
  let html = '';
  tokens.forEach((token) => {
    switch (token.type) {
      case 'text':
        // 🔥 关键：所有文本必须用 span 包裹
        html += createSpan(escapeHtml(token.raw || token.text || ''));
        break;

      case 'strong':
        const strongContent = processInlineTokens(token.tokens || []);
        html += `<strong>${strongContent}</strong>`;
        break;

      case 'em':
        const emContent = processInlineTokens(token.tokens || []);
        html += `<em>${emContent}</em>`;
        break;

      case 'codespan':
        const codeId = generateLakeId();
        const codeText = escapeHtml(token.text || '');
        html += `<code data-lake-id="${codeId}">${createSpan(codeText)}</code>`;
        break;

      case 'link':
        const linkId = generateLakeId();
        const linkText = processInlineTokens(token.tokens || []);
        html += `<a href="${escapeHtml(token.href || '')}" target="_blank" data-lake-id="${linkId}">${linkText}</a>`;
        break;

      case 'image':
        const imgId = generateLakeId();
        const imgSrc = escapeHtml(token.href || '');
        
        // 使用 card 格式
        const imgData = encodeURIComponent(`{"src":"${imgSrc}","linkTarget":"","title":null,"crop":[0,0,1,1],"id":"${imgId}"}`);
        html += `<card type="inline" name="image" value="data:${imgData}"></card>`;
        break;

      case 'br':
        html += '<br />';
        break;

      case 'del':
        const delContent = processInlineTokens(token.tokens || []);
        html += `<del>${delContent}</del>`;
        break;

      default:
        // 保留原始文本，用 span 包裹
        if (token.raw) {
          html += createSpan(escapeHtml(token.raw));
        } else if (token.text) {
          html += createSpan(escapeHtml(token.text));
        }
        break;
    }
  });
  return html;
}

/**
 * Markdown 到 Lake 格式转换器
 * 将 Markdown 转换为语雀 Lake 格式，完全符合语雀规范
 */
export function markdownToLake(markdown: string): string {
  const tokens = marked.lexer(markdown);
  let lakeHtml = '';

  tokens.forEach((token) => {
    switch (token.type) {
      case 'heading':
        const id = generateLakeId();
        const headingText = processInlineTokens(token.tokens || []);
        lakeHtml += `<h${token.depth} data-lake-id="${id}" id="${id}">${headingText}</h${token.depth}>`;
        break;

      case 'paragraph':
        const pId = generateLakeId();
        const paragraphText = processInlineTokens(token.tokens || []);
        lakeHtml += `<p data-lake-id="${pId}" id="${pId}">${paragraphText}</p>`;
        break;

      case 'code':
        // 🔥 关键：代码块使用 card 格式
        const codeId = generateLakeId();
        const codeText = token.text || '';
        const lang = token.lang || 'plain';
        const escapedCode = encodeURIComponent(codeText);
        const codeData = encodeURIComponent(`{"search":"","hideToolbar":true,"mode":"${lang}","code":"${escapedCode}","heightLimit":true,"id":"${codeId}"}`);
        lakeHtml += `<card type="inline" name="codeblock" value="data:${codeData}"></card>`;
        break;

      case 'blockquote':
        const blockquoteId = generateLakeId();
        const blockquoteContent = token.tokens?.map((t: any) => {
          if (t.type === 'paragraph') {
            const pId = generateLakeId();
            const text = processInlineTokens(t.tokens || []);
            return `<p data-lake-id="${pId}" id="${pId}">${text}</p>`;
          }
          return '';
        }).join('') || '';
        lakeHtml += `<blockquote data-lake-id="${blockquoteId}" id="${blockquoteId}">${blockquoteContent}</blockquote>`;
        break;

      case 'list':
        const listId = generateLakeId();
        const listTag = token.ordered ? 'ol' : 'ul';
        lakeHtml += `<${listTag} list="${listId}">`;

        if (token.items) {
          token.items.forEach((item: any) => {
            const itemId = generateLakeId();
            const itemText = processInlineTokens(item.tokens || []);

            // 检查是否是任务列表（checkbox）
            const isTask = item.checked !== undefined;
            if (isTask) {
              const checked = item.checked ? 'true' : 'false';
              lakeHtml += `<li data-lake-id="${itemId}" id="${itemId}" class="lake-list-node lake-list-task">`;
              lakeHtml += `<card type="inline" name="checkbox" value="data:${checked}"></card>`;
              lakeHtml += itemText;
              lakeHtml += `</li>`;
            } else {
              // 🔥 关键：移除 fid 属性，只保留 data-lake-id
              lakeHtml += `<li data-lake-id="${itemId}" id="${itemId}">${itemText}</li>`;
            }
          });
        }

        lakeHtml += `</${listTag}>`;
        break;

      case 'hr':
        // 🔥 关键：分割线使用 card 格式
        const hrId = generateLakeId();
        const hrData = encodeURIComponent(`{"id":"${hrId}"}`);
        lakeHtml += `<card type="block" name="hr" value="data:${hrData}"></card>`;
        break;

      case 'space':
        // 忽略空格
        break;

      default:
        // 保留原始内容
        if (token.raw) {
          lakeHtml += token.raw;
        }
        break;
    }
  });

  // 🔥 关键：不过滤，语雀会自己处理
  // 只保留必要的标签和属性
  return lakeHtml;
}
