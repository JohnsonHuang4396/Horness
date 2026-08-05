# 安全性检查清单

> 覆盖范围：前端安全性全面审查优先级说明：P0 必须修复（阻塞上线），P1 重要建议修复，P2 建议后续优化

---

## 一、XSS（跨站脚本攻击）防护 【P0】

- [ ] 用户输入渲染是否安全

    - 使用 Vue 模板插值 `{{ }}` 渲染用户内容（自动 HTML 转义）
    - 严禁使用 `v-html` 渲染任何来自用户输入或接口返回的富文本
    - 必须使用 `v-html` 时（如后台配置的公告内容），是否通过 `DOMPurify.sanitize()` 过滤后再渲染

        ```ts
        // ❌ 错误
        <div v-html="userContent" />

        // ✅ 正确
        import DOMPurify from 'dompurify'
        <div v-html="DOMPurify.sanitize(userContent)" />
        ```

- [ ] 动态属性绑定是否安全

    - 是否避免将用户输入直接绑定到 `href`、`src`、`action` 等属性
    - 对动态 URL 是否校验协议头，过滤 `javascript:`、`data:text/html` 等危险协议
        ```ts
        // ✅ 安全的 URL 校验
        function isSafeUrl(url: string): boolean {
            return /^(https?:)?\/\//i.test(url);
        }
        ```

- [ ] 是否避免直接操作 DOM 插入 HTML
    - 避免使用 `innerHTML`、`outerHTML`、`document.write()` 拼接用户数据
    - 使用 `textContent` 替代 `innerHTML` 渲染纯文本内容

---

## 二、敏感数据处理 【P0】

- [ ] 敏感数据是否避免在前端持久化

    - Token、密码、身份证号、手机号等敏感字段不得明文存储于 `localStorage` / `sessionStorage`
    - 需要本地缓存时，是否对数据加密后再存储（如使用 AES 加密）
    - 是否优先依赖后端 HttpOnly Cookie 管理会话，而非前端手动存储 Token

- [ ] 是否避免敏感信息在前端暴露

    - 生产代码中不包含 `console.log` 输出用户隐私数据（手机号、地址、证件号等）
    - 代码注释中不包含密钥、密码、内部接口地址等敏感信息
    - 是否配置构建工具在生产环境自动移除 `console` 输出（如 Vite 的 `drop: ['console']`）

- [ ] 敏感字段是否脱敏展示

    - 手机号、身份证号、银行卡号等在页面展示时是否脱敏（如 `138****8888`）
    - 脱敏处理是否在服务端完成（避免前端拿到完整数据再做截断，仍存在泄露风险）

- [ ] 接口响应数据是否按需使用
    - 是否避免将接口返回的完整对象（含敏感字段）直接绑定到页面或 URL 参数
    - URL 参数中是否包含手机号、邮箱、Token 等敏感信息（浏览器历史、Referer 头会泄露）

---

## 三、CSRF（跨站请求伪造）防护 【P1】

- [ ] 是否依赖系统提供的 CSRF 防护

    - HTTP 服务层是否统一携带 CSRF Token 请求头（通常由系统 `snippets/services/http/` 封装处理）
    - 是否避免绕过系统封装的 HTTP 服务、直接使用原生 `fetch` / `XMLHttpRequest` 发起请求（会丢失 CSRF Token）

- [ ] 跨域请求是否合理配置
    - 是否避免在前端代码中硬编码跨域白名单或手动设置 `withCredentials: true`（应由系统统一配置）
    - 是否避免通过 JSONP 方式请求接口（已过时且存在 XSS 风险）

---

## 四、路由与权限控制 【P0】

- [ ] 是否避免越权访问
    - 通过 URL 直接输入其他用户的资源 ID，是否能获取到非本人数据（需后端配合校验，前端不可作为唯一防线）
    - 涉及用户 ID 的接口参数，是否从登录态（Token）中获取，而非从 URL / 前端传参获取

---

## 五、依赖与供应链安全 【P1】

- [ ] 第三方依赖是否存在已知漏洞

    - 是否定期执行 `npm audit` 检查高危漏洞
    - 是否避免引入长期无人维护的 npm 包（检查最后发布时间和 GitHub 活跃度）
    - 是否将依赖版本锁定（`package-lock.json` 或 `pnpm-lock.yaml` 提交至仓库）

- [ ] CDN 外链资源是否使用 SRI 校验
    - 通过 `<script src="...">` 或 `<link href="...">` 引入外部 CDN 资源时，是否添加 `integrity` 属性（Subresource
      Integrity）防止资源被篡改
        ```html
        <!-- ✅ 使用 SRI 校验 -->
        <script
            src="https://cdn.example.com/lib.js"
            integrity="sha384-xxxx"
            crossorigin="anonymous"
        ></script>
        ```

---

## 六、接口调用安全 【P1】

- [ ] 请求参数是否做基本校验

    - 前端在提交表单前是否做必填项、格式、长度等基本校验（减少无效请求，但不替代后端校验）
    - 是否避免将用户输入的内容直接拼接到 SQL 片段、命令行参数中传给后端（防止注入）

- [ ] 是否避免在前端暴露内部接口信息

    - 接口地址、AppKey、AppSecret 等不得硬编码在前端代码中
    - 必须使用的配置项，是否通过环境变量（`.env`）注入，且 `.env` 文件不提交至 Git

- [ ] 文件上传是否做安全限制
    - 是否限制上传文件的类型（通过 `accept` 属性 + 文件头校验，不仅依赖扩展名）
    - 是否限制上传文件的大小，防止超大文件拖垮服务

---

## 七、点击劫持防护 【P2】

- [ ] 是否依赖服务端设置 `X-Frame-Options` 或 `Content-Security-Policy: frame-ancestors`
    - 防止页面被嵌入恶意 iframe 进行点击劫持（需与后端/运维配合）
    - 前端侧可通过以下代码做额外防护：
        ```ts
        // 检测当前页面是否被嵌入 iframe
        if (window.top !== window.self) {
            window.top!.location.href = window.self.location.href;
        }
        ```

---

## 快速速查表

| 问题类型  | 常见错误                                     | 正确做法                                          |
| --------- | -------------------------------------------- | ------------------------------------------------- |
| XSS 防护  | `v-html` 直接渲染用户/接口内容               | 通过 `DOMPurify.sanitize()` 过滤后再渲染          |
| XSS 防护  | `href`/`src` 直接绑定用户输入                | 校验 URL 协议头，过滤 `javascript:` 等危险协议    |
| XSS 防护  | `innerHTML` 拼接用户数据                     | 使用 `textContent` 或 Vue 模板语法                |
| 敏感数据  | Token 明文存储在 `localStorage`              | 使用 HttpOnly Cookie 或加密存储                   |
| 敏感数据  | `console.log` 输出手机号、证件号等隐私数据   | 移除调试输出，生产环境配置构建工具自动 drop       |
| 敏感数据  | 手机号、身份证号在页面完整展示               | 服务端脱敏后返回，前端仅展示脱敏结果              |
| 敏感数据  | 敏感字段出现在 URL 参数中                    | 敏感数据通过请求体（POST body）传输               |
| CSRF 防护 | 绕过系统 HTTP 封装，使用原生 fetch 请求      | 统一使用系统封装的 HTTP 服务，自动携带 CSRF Token |
| 路由权限  | 误将需登录页面的 `requiresSignIn` 设为 false | 仅登录页、错误页等特殊页面才关闭登录校验          |
| 权限控制  | 仅靠前端隐藏按钮，无后端接口权限校验         | 前端做 UI 控制，后端接口必须同步校验权限          |
| 依赖安全  | 引入含高危漏洞的 npm 包                      | 定期执行 `npm audit`，及时升级修复漏洞依赖        |
| 接口安全  | AppKey/AppSecret 硬编码在源码中              | 通过 `.env` 环境变量注入，`.env` 不提交至 Git     |
| 文件上传  | 仅靠 `accept` 属性限制文件类型               | 结合文件头（Magic Number）校验，并限制文件大小    |
| 点击劫持  | 未设置 `X-Frame-Options` 响应头              | 服务端配置 CSP `frame-ancestors`，前端配合检测    |
