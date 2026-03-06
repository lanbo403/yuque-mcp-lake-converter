# 🚀 完整部署指南

> **目标**：10分钟内完成 Yuque MCP Server 本地化部署，支持 Markdown → Lake 自动转换

---

## 📋 前置检查

### 系统要求

| 项目 | 要求 |
|------|------|
| **操作系统** | Windows / macOS / Linux |
| **Node.js** | >= 18.0.0 |
| **包管理器** | npm 或 yarn |
| **Git** | 用于克隆代码 |

### 验证环境

```bash
# 检查 Node.js 版本
node --version  # 应该 >= v18

# 检查 npm
npm --version

# 检查 Git
git --version
```

---

## 🔧 部署步骤

### 步骤 1：克隆仓库（1分钟）

```bash
# 克隆原仓库
git clone https://github.com/yuque/yuque-mcp-server.git
cd yuque-mcp-server

# 或者使用本项目（如果包含修改）
git clone https://github.com/lanbo403/yuque-mcp-lake-converter.git
cd yuque-mcp-server
```

### 步骤 2：安装依赖（2分钟）

```bash
# 安装项目依赖
npm install

# 安装额外依赖（转换器需要）
npm install marked dompurify jsdom @types/jsdom --save
```

### 步骤 3：复制转换器文件（1分钟）

**方式 1：使用本项目文件**

如果使用本增强版仓库，文件已包含在 `src/utils/converter.ts`

**方式 2：手动创建**

创建 `src/utils/converter.ts`，参考 [完整代码](https://github.com/lanbo403/yuque-mcp-lake-converter/blob/main/src/utils/converter.ts)

### 步骤 4：修改 `src/tools/doc.ts`（2分钟）

在 `yuque_create_doc` handler 中添加转换逻辑：

```typescript
// 1. 添加导入（文件顶部）
import { markdownToLake } from '../utils/converter.js';

// 2. 在 handler 中添加转换逻辑
handler: async (client, args) => {
  let body = args.body;
  let format = args.format || 'markdown';

  // 自动转换 Markdown → Lake
  if (format === 'markdown' && body) {
    body = markdownToLake(body);
    format = 'lake';
  }

  const data = {
    title: args.title,
    slug: args.slug,
    body: body,
    format: format,
    public: args.public,
  };

  const doc = await client.createDoc(args.repo_id, data);

  // Auto-append to TOC
  const tocWarning = await appendDocToToc(client, args.repo_id, doc.id);

  const result: { type: 'text'; text: string }[] = [
    { type: 'text' as const, text: JSON.stringify(formatDoc(doc), null, 2) },
  ];
  if (tocWarning) {
    result.push({ type: 'text' as const, text: tocWarning });
  }
  return { content: result };
}
```

### 步骤 5：构建项目（1分钟）

```bash
npm run build
```

**预期输出**：
```
> yuque-mcp@0.1.6 build
> tsc && chmod +x dist/cli.js
```

### 步骤 6：配置 Claude Code（2分钟）

#### 6.1 创建备份目录

```bash
# Windows
mkdir -p C:\Users\{你的用户名}\.claude\plugins\backup\yuque-mcp\original

# macOS
mkdir -p ~/.claude/plugins/backup/yuque-mcp/original
```

#### 6.2 备份原始配置

```bash
# Windows
copy C:\Users\{你的用户名}\.claude\plugins\marketplaces\yuque\plugins\yuque-personal\.mcp.json ^
   C:\Users\{你的用户名}\.claude\plugins\backup\yuque-mcp\original\.mcp.json.bak

# macOS
cp ~/.claude/plugins/marketplaces/yuque/plugins/yuque-personal/.mcp.json \
   ~/.claude/plugins/backup/yuque-mcp/original/.mcp.json.bak
```

#### 6.3 修改配置文件

**配置文件位置**：
- Windows: `C:\Users\{你的用户名}\.claude\plugins\marketplaces\yuque\plugins\yuque-personal\.mcp.json`
- macOS: `~/.claude/plugins/marketplaces/yuque/plugins/yuque-personal/.mcp.json`

**修改内容**：
```json
{
  "mcpServers": {
    "yuque": {
      "command": "node",
      "args": ["D:/yuque/yuque-mcp-server/dist/cli.js"],
      "env": {
        "YUQUE_TOKEN": "${YUQUE_PERSONAL_TOKEN}"
      }
    }
  }
}
```

**注意**：
- 路径使用正斜杠 `/` 或双反斜杠 `\\`
- 环境变量使用 `YUQUE_TOKEN`（不是 `YUQUE_PERSONAL_TOKEN`）

### 步骤 7：重启 Claude Code（必须）

**重要**：配置修改后必须完全重启 Claude Code 才能生效！

1. 完全退出 Claude Code 应用
2. 重新启动 Claude Code

---

## 🧪 验证部署

### 测试 1：检查 MCP 配置

在 Claude Code 中询问：
```
检查语雀 MCP 工具是否正常工作
```

### 测试 2：创建测试文档

创建一个测试文档：
```markdown
# 测试标题

**粗体** 和 *斜体*

- 列表项1
- 列表项2

[语雀](https://www.yuque.com)
```

### 验证结果

- ✅ 文档创建成功
- ✅ format 为 "lake"
- ✅ 语雀中完美渲染
- ✅ 包含 data-lake-id 属性

---

## 🔙 回滚方案

### 创建回滚脚本

**Windows**：
```bash
cat > C:\Users\{你的用户名}\.claude\plugins\backup\yuque-mcp\rollback.sh << 'EOF'
#!/bin/bash
set -e

echo "======================================="
echo "  语雀 MCP 回滚脚本"
echo "======================================="
echo ""

# 停止运行中的 yuque-mcp 进程
echo "1. 停止 yuque-mcp 进程..."
pkill -f "yuque-mcp" || true
sleep 1

# 恢复原始配置
echo "2. 恢复原始配置..."
cp "$HOME/.claude/plugins/backup/yuque-mcp/original/.mcp.json.bak" \
   "$HOME/.claude/plugins/marketplaces/yuque/plugins/yuque-personal/.mcp.json"

# 清理缓存
echo "3. 清理缓存..."
rm -rf ~/.claude/plugins/cache/yuque/ 2>/dev/null || true

echo ""
echo "✅ 回滚完成！"
echo ""
echo "请重启 Claude Code 以使更改生效。"
