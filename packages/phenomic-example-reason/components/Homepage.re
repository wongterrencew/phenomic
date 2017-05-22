external query : Js.t {..} => Js.t {..} =
  "query" [@@bs.module "phenomic-preset-default/lib/client"];

type edge 'a =
  | Idle 'a
  | Loading
  | Inactive
  | Errored;

type jsEdge 'a = Js.t {. status : string, node : 'a};

let jsEdgeToReason jsEdge convertNode =>
  switch jsEdge##status {
  | "loading" => Loading
  | "errored" => Errored
  | "idle" => Idle (convertNode jsEdge##node)
  | "inactive"
  | _ => Inactive
  };

let activityIndicator =
  <div
    style=(ReactDOMRe.Style.make textAlign::"center" fontFamily::"sans-serif" padding::"20px 0" ())>
    (ReactRe.stringToElement "Loading ...")
  </div>;

module Homepage = {
  include ReactRe.Component.Stateful.JsProps;
  let name = "Homepage";
  type page = {title: string, body: Content.jsBody};
  type props = {page: edge page};
  type state = {isActive: bool};
  let getInitialState _ => {isActive: false};
  type jsProps = Js.t {. page : jsEdge (Js.t {. title : string, body : Content.jsBody})};
  let convertNode jsNode => {title: jsNode##title, body: jsNode##body};
  let jsPropsToReasonProps =
    Some (fun jsProps => {page: jsEdgeToReason jsProps##page convertNode});
  let handleClick {state} _ => Some {isActive: not state.isActive};
  let render {props, state, updater} =>
    <div
      style=(
              ReactDOMRe.Style.make
                padding::"40px"
                borderBottomWidth::"1px"
                borderBottomColor::"rgba(0, 0, 0, 0.1)"
                borderBottomStyle::"solid"
                ()
            )
      onClick=(updater handleClick)>
      <h1
        style=(
                ReactDOMRe.Style.make
                  color::(state.isActive ? "#ff0000" : "#444444")
                  fontSize::"40px"
                  fontFamily::"sans-serif"
                  textAlign::"center"
                  ()
              )>
        (ReactRe.stringToElement "Phenomic, a static-site generator")
      </h1>
      (
        switch props.page {
        | Loading => activityIndicator
        | Inactive => activityIndicator
        | Idle page =>
          <div>
            <h2
              style=(
                      ReactDOMRe.Style.make
                        fontFamily::"sans-serif"
                        textAlign::"center"
                        fontSize::"30px"
                        fontWeight::"300"
                        ()
                    )>
              (ReactRe.stringToElement page.title)
            </h2>
            <BodyRenderer body=page.body />
          </div>
        | _ => ReactRe.nullElement
        }
      )
    </div>;
};

let queries () =>
  Js.Obj.assign (Js.Obj.empty ()) {"page": query {collection: "homepage", id: "homepage"}};

include ReactRe.CreateComponent Homepage;

let createElement ::page => wrapProps {page: page};
