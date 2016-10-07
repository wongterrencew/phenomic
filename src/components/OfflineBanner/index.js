// @flow

import React, { Component, PropTypes } from "react"
import offlinePluginRuntime from "offline-plugin/runtime"

export default class OfflineBanner extends Component {

  static propTypes = {
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    backgroundColorError: PropTypes.string,
    messages: PropTypes.shape({
      downloading: PropTypes.string,
      updateReady: PropTypes.string,
      error: PropTypes.string,
      update: PropTypes.string,
      dismiss: PropTypes.string,
    }),
    useDefaultStyles: PropTypes.bool,
  }

  static defaultProps = {
    color: "#fff",
    backgroundColor: "#1cae69",
    backgroundColorError: "#d32f2f",
    messages: {
      downloading: "Preparing website for offline usage...",
      updateReady: "Website is ready to be updated.",
      error: "An error occurred during the website update. " +
        "Check your network or try later.",
      update: "Update",
      dismiss: "╳",
    },
    useDefaultStyles: true,
  };

  state = { event: undefined };

  componentWillMount() {
    // for testing UI
    if (
      typeof window !== "undefined" &&
      this.props.useDefaultStyles
    ) {
      this._placeholderNode = document.createElement("style")
      this._placeholderNode.appendChild(document.createTextNode(styles))
      document.body.appendChild(this._placeholderNode)
    }

    if (typeof window !== "undefined") {
      // $FlowFixMe well no big deal
      window.PhenomicOfflineBanner = this
    }
  }

  componentDidMount() {
    // https://github.com/NekR/offline-plugin#install-options
    offlinePluginRuntime.install({
      onInstalled: this.handleDownloading,
      onUpdateFailed: this.handleError,
      onUpdating: this.handleDownloading,
      onUpdateReady: this.handleUpdateReady,
      // onUpdated: this.handleDismiss,
      onUninstalled: this.handleUpdateReady,
    })
  }

  componentWillUnmount() {
    if (
      typeof window !== "undefined" &&
      this.props.useDefaultStyles &&
      this._placeholderNode
    ) {
      document.body.removeChild(this._placeholderNode)
    }
  }

  _placeholderNode: Element;

  handleError = () => {
    console.log("phenomic: OfflineBanner: error")
    // trigger a UI error only if the download fails
    if (this.state.event === "downloading") {
      console.log("phenomic: OfflineBanner: error !")
      this.setState({ event: "error" })
    }
  };

  handleDismiss = () => {
    console.log("phenomic: OfflineBanner: dismiss")
    this.setState({ event: undefined })
  };

  handleDownloading = () => {
    console.log("phenomic: OfflineBanner: downloading")
    this.setState({ event: "downloading" })
  };

  handleUpdateReady = () => {
    console.log("phenomic: OfflineBanner: update ready")
    // trigger a UI update only if the download started
    if (this.state.event === "downloading") {
      console.log("phenomic: OfflineBanner: update ready !")
      this.setState({ event: "updateready" })
    }
  };

  handleUpdate = () => {
    // this call is useless since it's applied only for new downloads
    // (so will not update the current view)
    // offlinePluginRuntime.applyUpdate()

    window.location.reload()
  };

  render() {
    const { props, state } = this

    let message
    let style
    let spinner = false
    let canUpdate = false
    switch (state.event) {

    case "downloading":
      spinner = true
      message = this.props.messages.downloading
      style = {
        backgroundColor: props.backgroundColor,
        color: props.color,
      }
      break

    case "updateready":
      canUpdate = true
      message = this.props.messages.updateReady
      style = {
        backgroundColor: props.backgroundColor,
        color: props.color,
      }
      break

    case "error":
      message = this.props.messages.error
      style = {
        backgroundColor: props.backgroundColorError,
        color: props.color,
      }
      break

    default:
      return null
    }

    return (
      <div className={ `${ stylesPrefix }banner` }>
        <div
          className={ `${ stylesPrefix }content` }
          style={ style }
        >
          <div className={ `${ stylesPrefix }message` }>
            { spinner && <div className={ `${ stylesPrefix }spinner` } /> }
            { message }
          </div>
          <div className={ `${ stylesPrefix }action` }>
          {
            canUpdate && (
              <div
                role="button"
                className={ `${ stylesPrefix }button` }
                onClick={ this.handleUpdate }
              >
                { this.props.messages.update }
              </div>
            )
          }
          <div
            role="button"
            className={ `${ stylesPrefix }button` }
            onClick={ this.handleDismiss }
          >
            { this.props.messages.dismiss }
          </div>
          </div>
        </div>
      </div>
    )
  }
}

const stylesPrefix = "phenomic-OfflineBanner-"
const styles = `
.${ stylesPrefix }banner {
  position: fixed;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
}

.${ stylesPrefix }spinner {
  height: 16px;
  height: 1rem;
  width: 16px;
  width: 1rem;
  border: 2px solid transparent;
  border-top-color: #fff;
  border-radius: 100%;
  -webkit-animation: PhenomicOfflineBannerRotation 0.6s infinite linear 0.25s;
  animation: PhenomicOfflineBannerRotation 0.6s infinite linear 0.25s;
  opacity: 0;
  margin-right: 9.6px;
  margin-right: 0.6rem;
}

@-webkit-keyframes PhenomicOfflineBannerRotation {
  from {
    opacity: 1;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    opacity: 1;
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}

@keyframes PhenomicOfflineBannerRotation {
  from {
    opacity: 1;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    opacity: 1;
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}

.${ stylesPrefix }content {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 12px;
  font-size: 0.75rem;
  padding: 6.4px 9.6px;
  padding: 0.4rem 0.6rem;
  line-height: 22.4px;
  line-height: 1.4rem;
  background: #1cae69;
  color: #fff;
}

.${ stylesPrefix }message {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border: 1px solid transparent; /* to fit button border */
}

.${ stylesPrefix }actions {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.${ stylesPrefix }button {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  border: 1px solid currentColor;
  border-radius: 3px;
  padding: 0 4.8px;
  padding: 0 0.3rem;
  margin-left: 9.6px;
  margin-left: 0.6rem;
  cursor: pointer;
}
`
