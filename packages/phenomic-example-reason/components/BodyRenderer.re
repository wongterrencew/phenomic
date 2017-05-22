module BodyRenderer = {
  include ReactRe.Component;
  let name = "BodyRenderer";
  type props = {body: Content.jsBody};
  let rec renderChild child =>
    switch child {
    | Content.String string => ReactRe.stringToElement string
    | Content.Element tag originalProps reasonChildren =>
      let props = ReactDOMRe.objToDOMProps originalProps;
      ReactDOMRe.createElement
        tag
        ::props
        [|ReactRe.arrayToElement (Array.of_list (List.map renderChild reasonChildren))|]
    | Content.Empty => ReactRe.nullElement
    };
  let render {props} => {
    let tree = Content.jsTreeToReason props.body;
    <div style=(ReactDOMRe.Style.make fontFamily::"sans-serif" ())> (renderChild tree) </div>
  };
};

include ReactRe.CreateComponent BodyRenderer;

let createElement ::body => wrapProps {body: body};
