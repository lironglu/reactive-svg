import React, { useState } from "react";
import ReactDOM from "react-dom";
import FormRender from "form-render/lib/antd";
import renderHTML from "react-render-html";
import ejs from "ejs";
import SCHEMA from "./schema.json";

function Demo() {
  const [formData, setData] = useState({});
  const [svgData, setSvgData] = useState("");
  const [valid, setValid] = useState([]);

  const renderSvg = formData => {
    let parameters = {
      width: formData.shape.width,
      height: formData.shape.height,
      angle: formData.shape.angle,
      radius: formData.shape.radius,
      stroke: formData.style.stroke,
      fill: formData.style.fill
    };
    let str =
      '<svg width="<%=parameters.width%>" height="<%=parameters.height%>" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">\
                <g>\
                  <title>Layer 1</title>\
                  <path id="svg_1" d="M 1 <%=parameters.radius%> \
                                      A <%=parameters.radius%> <%=parameters.radius%> 0 0 1 <%=parameters.radius%> 1\
                                      H <%=parameters.width%> \
                                      L <%=parameters.width-parameters.height/2%> <%=parameters.height/2%> \
                                      L <%=parameters.width%> <%=(parameters.height-1)%> \
                                      L <%=parameters.radius%> <%=(parameters.height-1)%> \
                                      A <%=parameters.radius%> <%=parameters.radius%> 0 0 1 1 <%=(parameters.height-parameters.radius-1)%>\
                                      L 1 <%=parameters.radius%> Z"\
                  stroke-width="2" stroke="<%=parameters.stroke%>" fill="<%=parameters.fill%>"/>\
              </g>\
            </svg>';
    return ejs.render(str, { parameters });
  };

  const onChange = formData => {
    setSvgData(renderSvg(formData));
    setData(formData);
  };

  return (
    <div style={{ padding: 60 }}>
      <FormRender
        {...SCHEMA}
        formData={formData}
        onChange={onChange}
        onValidate={setValid}
      />
      <div>{renderHTML(svgData)}</div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Demo />, rootElement);
