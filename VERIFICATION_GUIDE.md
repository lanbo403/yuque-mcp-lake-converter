# 🧪 快速验证指南

## 配置修复状态

✅ **Token 配置已修复** - 2026-03-06 12:20

## 重启后验证步骤

### 1. 完全退出并重启 Claude Code

- **Windows**: 完全退出应用程序，然后重新启动
- **不要**仅仅重启会话

### 2. 创建测试文档

使用以下内容创建测试文档：

**标题**：🧪 转换测试

**内容**：
```markdown
### 标题测试

**粗体** 和 *斜体*

> 引用内容

**列表**：
- 项目一
- 项目二
- 项目三

`代码`

---

分割线
```

### 3. 验证结果

检查返回的 JSON：

✅ **成功标志**：
```json
{
  "format": "lake",
  "body": "<h3 data-lake-id=\"gen_xxx\" ...",
  ...
}
```

❌ **失败标志**：
```json
{
  "format": "markdown",
  "body": "### 标题测试\n...",
  ...
}
```

### 4. 关键检查点

| 检查项 | 成功标志 |
|--------|---------|
| 格式 | `format: "lake"` |
| data-lake-id | body 包含 `data-lake-id=` |
| fid 属性 | 列表项包含 `fid=` |
| card 标签 | 分割线转换为 `<card>` |

## 配置文件位置

**当前配置**：
```
C:\Users\liang\.claude\plugins\marketplaces\yuque\plugins\yuque-personal\.mcp.json
```

**内容**（已修复）：
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

## 如果验证失败

### 回滚到原始配置

```bash
C:\Users\liang\.claude\plugins\backup\yuque-mcp\rollback.sh
```

### 检查构建文件

```bash
ls -la D:/yuque/yuque-mcp-server/dist/cli.js
```

应该看到文件存在且可执行。

### 测试转换器

```bash
cd D:/yuque/yuque-mcp-server
node -e "
import('./dist/utils/converter.js').then(module => {
  const result = module.markdownToLake('# Test\n\n- Item');
  console.log('data-lake-id 存在:', result.includes('data-lake-id'));
  console.log('结果:', result);
});
"
```

## 状态总结

| 项目 | 状态 |
|------|------|
| 代码修改 | ✅ 完成 |
| 项目构建 | ✅ 成功 |
| Token 配置 | ✅ 已修复 |
| 缓存清理 | ✅ 完成 |
| 重启验证 | ⏸️ 等待重启 |

---

**最后更新**：2026-03-06 12:20
**修复内容**：Token 环境变量配置错误
