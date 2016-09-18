## Table 布局

### 优点

  垂直居中和等高

### 缺点
  
  * 额外的 wrap
  * 如果单元格之间有空白，需要在`display: table`的元素上用 `border-collapse: separate` 和 `border-spacing: xx xx`,同时这一行的开头和结尾也会出现空白。 
  * 内容可以溢出单元
  * 响应的时候只能一行多列或者一行一列

### 适用场景
  
  需要垂直居中(元素大小不固定)、等高布局的时候，响应只有从table到block

### 常用display值

  * table 使该元素按table样式渲染
  * table-row 使该元素按tr样式渲染
  * table-cell 使该元素按td样式渲染

### 常用表格属性
  
  * table-layout 将table-layout属性设置为fixed可以让浏览器按照固定算法来渲染单元格的宽度
  * border-collapse 使用border-collapse属性来定义你的table布局元素之间使用何种形式的边框，是共用边框（赋值为collapse）还是使用各自独立的边框（赋值为separate）
  * border-spacing 如果你声明了“border-collapse:separate;”，那么你就可以使用border-spacing属性来定义相邻两个单元格边框间的距离