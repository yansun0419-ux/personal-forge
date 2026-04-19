import CryptoTool from "./utility/CryptoTool"; // 假设你之前已经把加密工具抽成了组件

// 以后你所有的交互小工具、特殊排版组件，都在这里统一注册
export const mdxComponents = {
  CryptoTool,
  // 比如以后可以加：
  // MusicPlayer,
  // CodeSandbox,
};
