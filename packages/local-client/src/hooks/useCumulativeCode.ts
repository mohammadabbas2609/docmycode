import { useTypedSelector } from "./useTypedSelector";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector(state => {
    const data = state.cells?.data;
    const order = state.cells?.order;

    const orderedCells = order?.map(id => data && data[id]);

    const viewFunc = `
        import _React from "react";
        import _ReactDOM from "react-dom";
        var view = (value) => {
          
          const root = document.querySelector("#root");
    
          if(typeof value === "object"){
            if(value.$$typeof && value.props){
              ReactDOM.render(value,root)
            }else{
              root.innerHTML = JSON.stringify(value,null,4)
            }
          }else{
            root.innerHTML = value
          }
          
        }      
      `;

    const viewFuncNoOps = `var view = () => {}`;

    const cumulativeCode = [];
    if (orderedCells) {
      for (let c of orderedCells) {
        if (c?.type === "code") {
          if (c.id === cellId) {
            cumulativeCode.push(viewFunc);
          } else {
            cumulativeCode.push(viewFuncNoOps);
          }

          cumulativeCode.push(c.content);
        }
        if (c?.id === cellId) break;
      }
    }

    return cumulativeCode;
  }).join("\n");
};
