"use strict";

import $ from 'jquery';
import _ from 'lodash';

$(() => {
  console.warn("警告のテストだよ！");
  
  var pdfData = './sample.pdf';
  
  var loadingTask = PDFJS.getDocument(pdfData);
  console.log("[loadingTask]", loadingTask);
  
  loadingTask.then((pdf) => {
    console.warn("[pdf]呼んだ？", pdf.getPage(2));
    return pdf.getPage(2);
  })
  .then((page) => {
    var scale = 1,
        viewport = page.getViewport(scale),
        canvas = document.getElementById('viewer'),
        context = canvas.getContext('2d');
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    
    console.warn("[page]呼んだ？", page);
    page.render(renderContext);
  });
  
});