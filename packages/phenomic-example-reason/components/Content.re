type reasonChildren = list reasonChild
and reasonChild =
  | String string
  | Element string (Js.t {.}) reasonChildren
  | Empty;

type jsBody = Js.t {. t : string, p : Js.t {.}, c : array jsBody};

let rec jsTreeToReason (jsChild: jsBody) =>
  switch [%bs.raw {| Object.prototype.toString.call(jsChild) |}] {
  | "[object String]" => String (Js.String.make jsChild)
  | "[object Object]" =>
    let tag = Js.String.make jsChild##t;
    let props = jsChild##p;
    let children = List.map jsTreeToReason (Array.to_list jsChild##c);
    Element tag props children
  | _ => Empty
  };
