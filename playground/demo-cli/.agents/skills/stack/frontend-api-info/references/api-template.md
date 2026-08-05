## 通用接口模版

生成的接口文档包含以下内容：

1. **接口路径**：完整的API路径
2. **请求方式**：HTTP方法（GET/POST/PUT/DELETE等）
3. **接口前缀**（可选）：如 `CONF.plcApiPrefix`
4. **接口说明**：接口功能描述
5. **请求参数**：使用TypeScript格式定义
6. **响应数据**：使用TypeScript格式定义完整的响应结构

- **接口路径**: 【如：`/simplify/plcRebateComplaint/secure/queryList.do`】
- **请求方式**: 【如：`POST`】
- **接口前缀<可选>**：使用接口前缀，【如：`CONF.plcApiPrefix`】,项目中没有时，在`config.ts`中补充配置
- **接口说明**：【接口说明】
- **请求参数**:

```typescript
    {
      restParams: {
        【参数键值对，如：complaintNum?：string; // 申诉单号】
      }
    }
```

- **响应数据**:

**返回完整的响应数据结构，如下面的例子**

```typescript
    {
      code: string;       // 状态码，"000000"表示成功
      errorList: string[];   // 是否成功
      msg: string;    // 提示信息
      data: 【主要数据ts填充】,
      pagination?: 【分页数据,非必须，一般在分页列表中出现，选填】
    }
```

## 注意事项

**请严格按照上述模版中定义的输出的内容进行填充，切勿随意添加其他内容**

- 使用 ts 类型声明定义请求参数和响应数据，**请求参数只关注 restParams 部分**
- 通过 ts 语法明确标注参数是否必填（`?`表示可选），读取每个字段的注释说明，没有则不填充
- 响应数据必须包含完整的数据结构
