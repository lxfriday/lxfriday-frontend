# 数字相关

- 字符串转数字的情形
  - '123ab' 转换为数字
    - `parseInt('123ab', 10)` 123
    - `+'123ab'` or `Number('123ab')` NaN
