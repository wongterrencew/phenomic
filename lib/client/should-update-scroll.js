"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var lookForElement = function lookForElement(id) {
  var element = document.getElementById(id);
  if (element === null) {
    var elementsSet = document.getElementsByName(id);
    if (elementsSet.length) {
      element = elementsSet[0];
    }
  }

  return element;
};

var retryTimeout = null;
var retryCount = 0;
var retryDelay = 100;
var retryMax = 1000; // 1000 * retryDelay = retry during 10s

var moveToHash = function moveToHash(id) {
  var element = lookForElement(id);
  if (element) {
    if (element.scrollIntoViewA) {
      element.scrollIntoView();
    } else {
      var coords = element.getBoundingClientRect();
      // $FlowFixMe window
      window.scrollTo(
      // $FlowFixMe window
      coords.left + window.pageXOffset,
      // $FlowFixMe window
      coords.top + window.pageYOffset);
    }
    return true;
  }
  if (retryCount < retryMax) {
    retryTimeout = setTimeout(function () {
      retryCount++;
      moveToHash(id);
    }, retryDelay);
  }

  return false;
};

// only scroll when complete url changes
// (except for hash change - this example provide a natural feeling when you
// use simple link to internal anchor (eg: a table of content that use hashes
// inside a page))

var shouldUpdateScroll = function shouldUpdateScroll(prevProps, props) {
  var hash = props.location.hash;

  // if there is a page + hash,
  // it's probably not already in the page since we load page data
  // asynchronously, AFTER react-router does his job
  // so here we will handle the work ourselves
  // (and tell react-router-scroll to not handle it)
  if (
  // if page is the same, browser will handle the scroll automatically
  // so we execute our logic for the scroll only if location change
  // and include a hash
  prevProps && prevProps.location.pathname + prevProps.location.search !== props.location.pathname + props.location.search && hash.length > 1) {
    retryCount = 1;
    clearTimeout(retryTimeout);
    var hasScrolled = moveToHash(hash.slice(1));

    // scroll to top until dom is ready,
    // code above might handle the scroll LATER
    // if it does we know it and tell react-router to scroll to top until dom
    // is ready to avoid weird UX (eg: click, no scroll at all)
    return !hasScrolled;
  }

  return Boolean(prevProps) && hash === "";
};

exports.default = shouldUpdateScroll;