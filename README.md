<div style='text-align: center'><img src='./src/assets/icon/extractor.svg' alt="" ></div>

# figma-plugin-extractor
Extract basic design data to JSON and other preferred format.

## Install prebundle version

Download the zip file in assets, and follow the instruction (install plugin in figma) below.

## Develop

> Recommend IDE: Visual Studio Code

**Install Node.js**

Requirement: version >= 14.0
both 14LTS, 16LTS is recommended.

**Install pnpm**
Make sure `pnpm` pkg manager is install.
[Installation Guide](https://pnpm.io/installation)

```
npm i -g pnpm
```

**Install dependencies**

```
pnpm i
```

**UI Preview**

```
pnpm start --filter plugin
```

http://localhost:3333/ should be opened by vite. You won't need this step if you mainly check the result in figma.

**Bundle plugin**

```
pnpm bundle --filter plugin
```

This will transform `index.html` and `plugin.ts` into dist folder.

**install plugin in figma**

Open figma and select `plugins > development > import plugin from manifest`, choose the `manifest.json` file located in `package/plugin`

You will only need to install once.