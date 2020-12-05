import React, { Component } from "react";
import classes from "./emojis.module.css";

export default class Emojis extends Component {
  render() {
    const { isOpen, onClickHandle } = this.props;

    return (
      <div
        onClick={onClickHandle}
        style={{ display: isOpen ? "block" : "none" }}
        className={classes.emojis}
      >
        {/* <div className={classes.recently}>
          <p>Recenly used</p>

          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            {" "}
            😄{" "}
          </span>
        </div> */}
        <div className={classes.all}>
          <p>All</p>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😀
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😃
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😄
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😁
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😆
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😅
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🤣
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😂
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🙂
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🙃
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😉
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😊
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😇
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🥰
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😍
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🤩
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😘
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😗
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😚
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😙
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😋
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😛
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😜
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🤪
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😝
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🤑
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🤗
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🤫
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🤔
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🤐
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🤨
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😐
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😑
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😶
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😏
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😒
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🙄
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😬
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🤥
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😌
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😔
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😪
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🤤
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😴
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😷
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🤒
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🤕
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🤢
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🤮
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🤧
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🥵
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🥶
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🥴
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😵
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🤯
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🤠
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🥳
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😎
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🤓
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🧐
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😕
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😟
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🙁
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😮
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😯
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😲
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😳
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🥺
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😦
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😧
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😨
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😰
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😥
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😢
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😭
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😱
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😖
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😣
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😞
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😓
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😩
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😫
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🥱
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😤
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😡
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😠
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            🤬
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            😈
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            👿
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            💀
          </span>
          <span className={classes.emoji} role="img" aria-labelledby="emoji">
            ☠
          </span>
        </div>
      </div>
    );
  }
}
