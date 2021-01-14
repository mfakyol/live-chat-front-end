import React, {useRef} from "react";
import classes from "./style.module.css";

export default function LoadingSpinner({status}) {
    const spinner = useRef(null);
    if(!status && spinner.current) {
        spinner.current.style.opacity = 0;
        setTimeout(() => {
           if(spinner.current){
            spinner.current.style.display="none";
           }
        }, 300);
    }
    else if(spinner.current){
        spinner.current.style.opacity= 1;
        setTimeout(() => {
            if(spinner.current){
              spinner.current.style.display="block";
            }
        }, 300);
    }
  return (
    <div ref={spinner}  className={classes["spinner-wrapper"]}>
      <div className={classes["spinner"]}>
      </div>
    </div>
  );
}
