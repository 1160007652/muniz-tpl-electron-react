Muniz - React - TPL

## 技术

react、react-router、mobx、webpack5、less

## 项目构建:

### 初始环境:

1. 安装 [Node.js](https://nodejs.org/en/download/);
2. 全局安装 **yarn** 包管理器;

```bash
$ npm install -g yarn
```

3. 在项目目录中，执行以下命令：

```bash
$ yarn install
```

### 开发环境 · 运行:

在项目更新目录中执行以下命令。

```bash
$ yarn dev
```

### 建立生产环境：

在项目更新目录中执行以下命令，以构建用于在生产环境中执行的资源。

```bash
$ yarn build
```

> 构造的资源位于 **"项目根目录/dist"**

### 问题记录：

#### 1. 如果打包时候，发现 **Command failed: codesign --sign** 问题

执行

```bash
export CSC_IDENTITY_AUTO_DISCOVERY=false
```

#### 2. 安装 electron 慢，请输入如下镜像

执行

```bash
export ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
```
