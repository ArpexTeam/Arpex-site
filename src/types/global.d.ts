import "react";

declare module "react" {
  interface CSSProperties {
    ["--line-dur"]?: string;
    ["--line-delay"]?: string;
    ["--dot-delay"]?: string;
    ["--rwd-ratio"]?: string; // se você usa em outros lugares
    ["--base-w"]?: string;    // idem
  }
}
